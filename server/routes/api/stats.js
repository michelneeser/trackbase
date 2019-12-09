const express = require('express');
const Stat = require('../../models/Stat');
const randomstring = require('randomstring');

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
      res.status(404).json({ msg: 'Stat not found' });
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
      res.status(404).json({ msg: 'Stat not found' });
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
    return res.status(400).json({ msg: 'Please provide a value' });
  }

  Stat.findOne({ statId })
    .then(stat => {
      stat.values = [...stat.values, {
        valueId: stat.values.length + 1,
        value: String(payload.value)
      }];
      stat.save()
        .then(res.json(stat))
        .catch(err => console.log(err));
    })
    .catch(err => {
      res.status(404).json({ msg: 'Stat not found' });
      console.error(err);
    });
});

module.exports = router;