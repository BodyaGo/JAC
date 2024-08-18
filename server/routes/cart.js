const express = require('express');
const User = require('../models/User');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { detailId } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.cart.some(item => item.detail && item.detail.toString() === detailId)) {
      return res.status(400).json({ message: 'Detail already in cart' });
    }

    user.cart.push({ detail: detailId, quantity: 1 });
    await user.save();
    res.json({ message: 'Detail added to cart', cart: user.cart });
  } catch (err) {
    console.error('Add to cart error:', err);
    res.status(500).json({ message: 'Failed to add to cart', error: err.message });
  }
});

router.put('/:detailId', auth, async (req, res) => {
  try {
    const { detailId } = req.params;
    const { quantity } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const cartItem = user.cart.find(item => item.detail && item.detail.toString() === detailId);
    if (!cartItem) return res.status(404).json({ message: 'Detail not found in cart' });

    cartItem.quantity = quantity;
    await user.save();
    res.json({ message: 'Cart updated', cart: user.cart });
  } catch (err) {
    console.error('Update cart error:', err);
    res.status(500).json({ message: 'Failed to update cart', error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart.detail');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.cart.filter(item => item.detail).map(item => ({ ...item.detail.toObject(), quantity: item.quantity })));
  } catch (err) {
    console.error('Cart fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
});

router.delete('/:detailId', auth, async (req, res) => {
  try {
    const { detailId } = req.params;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.cart = user.cart.filter(item => item.detail && item.detail.toString() !== detailId);
    await user.save();
    res.json({ message: 'Detail removed from cart', cart: user.cart });
  } catch (err) {
    console.error('Remove from cart error:', err);
    res.status(500).json({ message: 'Failed to remove from cart', error: err.message });
  }
});

module.exports = router;
