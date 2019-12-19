const express = require('express');
const Stat = require('../../models/Stat');

const router = express.Router();

// @route    GET /api/stats
// @desc     returns all stats
// @access   public
router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find();
    res.send(stats.map(stat => transformStat(req, stat)));
  } catch (error) {
    setUnknownError(res, 'Error while getting all stats');
  }
});

// @route    POST /api/stats
// @desc     creates a new stat
// @access   public
router.post('/', async (req, res) => {
  try {
    const stat = await new Stat().save();
    res.send(transformStat(req, stat));
  } catch (error) {
    setUnknownError(res, 'Error while creating new stat');
  }
});

// @route    GET /api/stats/:statId
// @desc     returns a single stat
// @access   public
router.get('/:statId', async (req, res) => {
  try {
    const statId = req.params.statId;
    const stat = await getStat(statId);
    res.send(transformStat(req, stat));
  } catch (error) {
    setStatNotFound(res);
  }
});

// @route    GET /api/stats/:statId/values
// @desc     returns the values of a single stat
// @access   public
router.get('/:statId/values', async (req, res) => {
  try {
    const statId = req.params.statId;
    const values = await getStatValues(statId);
    res.send(transformStatValues(req, statId, values));
  } catch (error) {
    console.log(error);
    setStatNotFound(res);
  }
});

// @route    POST /api/stats/:statId/values
// @desc     adds a single value to a stat
// @access   public
router.post('/:statId/values', async (req, res) => {
  const statId = req.params.statId;
  const payload = req.body;

  if (!payload.value) {
    setInvalidPayload(res);
    return;
  }

  try {
    let stat = await getStat(statId);
    stat.values.data = [
      { value: payload.value },
      ...stat.values.data
    ];
    stat = await stat.save();
    res.send(transformStatValues(req, statId, stat.values));
  } catch (error) {
    setStatNotFound(res);
  }
});

// @route    DELETE /api/stats/:statId/values/:valueId
// @desc     deletes a single value from a stat
// @access   public
router.delete('/:statId/values/:valueId', async (req, res) => {
  try {
    const { statId, valueId } = req.params;
    let stat = await getStat(statId);
    let data = stat.values.data;
    const nrOfValuesBefore = data.length;
    data = data.filter(value => value.valueId !== valueId);

    if (data.length !== nrOfValuesBefore) {
      stat.values.data = data;
    } else {
      setValueNotFound(res);
      return;
    }

    stat = await stat.save();
    res.send(transformStatValues(req, statId, stat.values));
  } catch (error) {
    console.log(error);
    setStatNotFound(res);
  }
});

// @route    POST /api/stats/:statId/name
// @desc     updates the name of a stat
// @access   public
router.put('/:statId/name', async (req, res) => {
  const statId = req.params.statId;
  const payload = req.body;

  if (!payload.value) {
    setInvalidPayload(res);
    return;
  }

  try {
    let stat = await getStat(statId);
    stat.name = payload.value;
    stat = await stat.save();
    res.json(stat);
  } catch (error) {
    setStatNotFound(res);
  }
});

///////////////////////
// Utility functions //
///////////////////////

// Query functions
getStat = async (statId) => {
  const stat = await Stat.findOne({ statId });
  if (!stat) throw Error();
  return stat;
}

getStatValues = async (statId) => {
  const values = await Stat.findOne({ statId }, 'values');
  if (!values) throw Error();
  return values.values;
}

transformStat = (req, stat) => {
  let statObj = stat.toObject();
  delete statObj.values;
  statObj.url = `${getStatsPath(req)}/${statObj.statId}`;
  statObj.valuesUrl = `${getStatsPath(req)}/${statObj.statId}/values`;
  return statObj;
}

transformStatValues = (req, statId, values) => {
  let valuesObj = values.toObject();
  valuesObj.data.forEach(value => {
    delete value._id;
    value.url = `${getStatsPath(req)}/${statId}/values/${value.valueId}`;
  });
  valuesObj.numeric = (valuesObj.data.findIndex(value => isNaN(value.value)) === -1);
  valuesObj.statUrl = `${getStatsPath(req)}/${statId}`;
  return valuesObj;
}

getStatsPath = req => {
  return req.protocol + "://" + req.get('host') + "/api/stats";
}

// Error setting function
// TODO https://expressjs.com/en/guide/error-handling.html
setInvalidPayload = (res) => {
  res.status(400).json({ msg: 'Invalid payload' });
}

setStatNotFound = (res) => {
  res.status(404).json({ msg: 'Stat not found' });
}

setValueNotFound = (res) => {
  res.status(404).json({ msg: 'Value not found' });
}

setUnknownError = (res, msg) => {
  res.status(500).json({ msg });
}

module.exports = router;