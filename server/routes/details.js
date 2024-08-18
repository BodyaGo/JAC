const express = require('express');
const mongoose = require('mongoose');
const Detail = require('../models/Detail');
const Machine = require('../models/Machine');
const { auth, isAdmin } = require('../middlewares/auth');

const router = express.Router();

router.post('/', [auth, isAdmin], async (req, res) => {
  try {
    const { name, description, price, machine, imageUrls } = req.body;

    let machineId;

    if (typeof machine === 'object' && machine.name && machine.imageUrl) {
      const newMachine = new Machine({ name: machine.name, imageUrl: machine.imageUrl });
      await newMachine.save();
      machineId = newMachine._id;
    } else if (mongoose.Types.ObjectId.isValid(machine)) {
      machineId = machine;
    } else {
      return res.status(400).json({ message: 'Invalid machine data' });
    }

    const detail = new Detail({ name, description, price, machine: machineId, imageUrls });
    await detail.save();
    res.json({ message: 'Detail created' });
  } catch (err) {
    console.error('Detail creation error:', err);
    res.status(500).json({ message: 'Failed to create detail', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category, priceMin, priceMax, availability, brands, features } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (priceMin || priceMax) filters.price = { $gte: priceMin || 0, $lte: priceMax || 100 };
    if (availability) filters.availability = { $in: availability.split(',') };
    if (brands) filters.brand = { $in: brands.split(',') };
    if (features) filters.features = { $in: features.split(',') };

    const details = await Detail.find(filters);
    res.json({ details, totalPages: 1 });
  } catch (err) {
    console.error('Error fetching details:', err);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, machine, imageUrls } = req.body;

    let machineId;

    if (typeof machine === 'object' && machine.name && machine.imageUrl) {
      const newMachine = new Machine({ name: machine.name, imageUrl: machine.imageUrl });
      await newMachine.save();
      machineId = newMachine._id;
    } else if (mongoose.Types.ObjectId.isValid(machine)) {
      machineId = machine;
    } else {
      return res.status(400).json({ message: 'Invalid machine data' });
    }

    await Detail.findByIdAndUpdate(id, { name, description, price, machine: machineId, imageUrls });
    res.json({ message: 'Detail updated' });
  } catch (err) {
    console.error('Detail update error:', err);
    res.status(500).json({ message: 'Failed to update detail', error: err.message });
  }
});

router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const { id } = req.params;
    await Detail.findByIdAndDelete(id);
    res.json({ message: 'Detail deleted' });
  } catch (err) {
    console.error('Detail deletion error:', err);
    res.status(500).json({ message: 'Failed to delete detail', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await Detail.findById(id);
    if (!detail) return res.status(404).json({ message: 'Detail not found' });
    res.json(detail);
  } catch (err) {
    console.error('Detail fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch detail', error: err.message });
  }
});

module.exports = router;
