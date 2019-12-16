const express = require('express');
const Stat = require('../../models/Stat');
const generateUniqueID = require('../../utils/id-generator');

const router = express.Router();

// @route    GET /api/stats
// @desc     returns all stats
// @access   public
router.get('/', (req, res) => {
  Stat.find()
    .then(stats => res.json(stats))
    .catch(err => {
      res.status(500).json({ msg: 'Error while getting all stats' });
      console.error(err);
    });
});

// @route    POST /api/stats
// @desc     creates a new stat
// @access   public
router.post('/', (req, res) => {
  new Stat().save()
    .then(stat => {
      const statToReturn = {
        name: stat.name,
        statId: stat.statId,
        created: stat.created
      };
      res.json(statToReturn);
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error while creating new stat' });
      console.error(err);
    });
});

// @route    GET /api/stats/:statId
// @desc     returns a single stat
// @access   public
router.get('/:statId', (req, res) => {
  const statId = req.params.statId;
  Stat.findOne({ statId }, '-_id -__v -values._id')
    .then(stats => res.json(stats))
    .catch(err => {
      setStatNotFound(res);
      console.error(err);
    });
});

// @route    GET /api/stats/:statId/values
// @desc     returns the values of a single stat
// @access   public
router.get('/:statId/values', (req, res) => {
  const statId = req.params.statId;
  Stat.findOne({ statId }, '-_id -__v -values._id')
    .then(stat => res.json(stat.values))
    .catch(err => {
      setStatNotFound(res);
      console.error(err);
    });
});

// @route    POST /api/stats/:statId/values
// @desc     adds a single value to a stat
// @access   public
router.post('/:statId/values', (req, res) => {
  const statId = req.params.statId;
  const payload = req.body;

  if (!payload.value) {
    setInvalidPayload(res);
    return;
  }

  Stat.findOne({ statId })
    .then(stat => {
      stat.values = [
        {
          valueId: generateUniqueID(),
          value: String(payload.value)
        },
        ...stat.values
      ];
      stat.save()
        .then(stat => {
          const statValues = stat.values.map(value => (
            {
              valueId: value.valueId,
              value: value.value,
              created: value.created
            }
          ));
          res.json(statValues);
        })
        .catch(err => console.error(err));
    })
    .catch(err => {
      setStatNotFound(res);
      console.error(err);
    });
});

// @route    DELETE /api/stats/:statId/values/:valueId
// @desc     deletes a single value from a stat
// @access   public
router.delete('/:statId/values/:valueId', (req, res) => {
  const { statId, valueId } = req.params;
  Stat.findOne({ statId })
    .then(stat => {
      const nrOfValuesBefore = stat.values.length;
      stat.values = stat.values.filter(value => value.valueId != valueId);
      if (stat.values.length === nrOfValuesBefore) {
        setValueNotFound(res);
        return;
      }

      stat.save()
        .then(stat => {
          const statValues = stat.values.map(value => (
            {
              valueId: value.valueId,
              value: value.value,
              created: value.created
            }
          ));
          res.json(statValues);
        })
        .catch(err => console.error(err));
    })
    .catch(err => {
      setStatNotFound(res);
      console.error(err);
    });
});

// @route    POST /api/stats/:statId/name
// @desc     updates the name of a stat
// @access   public
router.put('/:statId/name', (req, res) => {
  const statId = req.params.statId;
  const payload = req.body;

  if (!payload.value) {
    setInvalidPayload(res);
    return;
  }

  Stat.findOne({ statId })
    .then(stat => {
      stat.name = payload.value;
      stat.save()
        .then(stat => res.json(stat))
        .catch(err => console.error(err));
    })
    .catch(err => {
      setStatNotFound(res);
      console.error(err);
    })
});

// Utility functions

setInvalidPayload = (res) => {
  res.status(400).json({ msg: 'Invalid payload' });
}

setStatNotFound = (res) => {
  res.status(404).json({ msg: 'Stat not found' });
}

setValueNotFound = (res) => {
  res.status(404).json({ msg: 'Value not found' });
}

module.exports = router;