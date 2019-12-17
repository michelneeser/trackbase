const express = require('express');
const Stat = require('../../models/Stat');

const router = express.Router();

// @route    GET /api/stats
// @desc     returns all stats
// @access   public
router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find();
    res.json(stats);
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
    res.json(stat);
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
    res.json(stat);
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
    res.json(values);
  } catch (error) {
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
    stat.values = [
      {
        value: payload.value
      },
      ...stat.values
    ];
    stat = await stat.save();
    res.json(stat);
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
    const nrOfValuesBefore = stat.values.length;
    stat.values = stat.values.filter(value => value.valueId != valueId);
    if (stat.values.length === nrOfValuesBefore) {
      setValueNotFound(res);
      return;
    }
    stat = await stat.save();
    res.json(transformStatValues(stat.values));
  } catch (error) {
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
  const valuesObj = await Stat.findOne({ statId }, 'values');
  if (!valuesObj) throw Error();
  return transformStatValues(valuesObj.values);
}

transformStatValues = values => {
  return values.toObject({ transform: (doc, ret) => { delete ret._id } });
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