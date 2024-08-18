const express = require('express');
const Machine = require('../models/Machine');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (err) {
    console.error('Error fetching machines:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
