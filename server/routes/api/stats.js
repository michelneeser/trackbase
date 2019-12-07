const express = require('express');
const Stat = require('../../models/Stat');

const router = express.Router();

// @route    GET /api/stats
// @desc     returns all stats
// @access   public
router.get('/', (req, res) => {
  Stat.find()
    .then(stats => res.json(stats))
    .catch(err => console.log(err));
});

// @route    POST /api/stats
// @desc     creates a new stat
// @access   public
router.post('/', (req, res) => {
  new Stat().save()
    .then(stat => res.json(stat))
    .catch(err => console.log(err));
});

// @route    GET /api/stats/:statId/values
// @desc     returns the values of a single stat
// @access   public
router.get('/:statId/values', (req, res) => {
  const statId = req.params.statId;
  Stat.findById(statId)
    .then(stat => res.json(stat.values))
    .catch(err => console.log(err));
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

  Stat.findById(statId)
    .then(stat => {
      stat.values = [...stat.values, String(payload.value)];
      stat.save()
        .then(res.json(stat))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;