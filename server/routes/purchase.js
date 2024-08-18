const express = require('express');
const User = require('../models/User');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart.detail');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Handle purchase logic, e.g., saving order details, clearing the cart, etc.
    const purchasedItems = user.cart.map(item => ({ detail: item.detail, quantity: item.quantity }));
    user.cart = [];
    await user.save();

    res.json({ message: 'Purchase successful', purchasedItems });
  } catch (err) {
    console.error('Purchase error:', err);
    res.status(500).json({ message: 'Purchase failed', error: err.message });
  }
});

module.exports = router;
