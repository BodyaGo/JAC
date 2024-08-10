require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const Detail = require('./models/Detail'); // Changed from Dish to Detail

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const auth = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Failed to authenticate token' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

app.post('/api/register', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, phone, email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

app.get('/api/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
});


app.post('/api/details', [auth, isAdmin], async (req, res) => {
  try {
    const { name, description, price, imageUrl, machine } = req.body; // Include machine
    if (!machine) {
      return res.status(400).json({ message: 'Machine field is required' });
    }
    const detail = new Detail({ name, description, price, imageUrl, machine });
    await detail.save();
    res.json({ message: 'Detail created' });
  } catch (err) {
    console.error('Detail creation error:', err);
    res.status(500).json({ message: 'Failed to create detail', error: err.message });
  }
});

app.get('/api/details', async (req, res) => {
  try {
    const { category, priceMin, priceMax, availability, brands, features } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (priceMin || priceMax) filters.price = { $gte: priceMin || 0, $lte: priceMax || 100 };
    if (availability) filters.availability = { $in: availability.split(',') };
    if (brands) filters.brand = { $in: brands.split(',') };
    if (features) filters.features = { $in: features.split(',') };

    const details = await Detail.find(filters);
    res.json({ details, totalPages: 1 }); // Adjust totalPages if using pagination
  } catch (err) {
    console.error('Error fetching details:', err);
    res.status(500).send('Server Error');
  }
});


app.put('/api/details/:id', [auth, isAdmin], async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, machine } = req.body; // Include machine
    if (!machine) {
      return res.status(400).json({ message: 'Machine field is required' });
    }
    await Detail.findByIdAndUpdate(id, { name, description, price, imageUrl, machine });
    res.json({ message: 'Detail updated' });
  } catch (err) {
    console.error('Detail update error:', err);
    res.status(500).json({ message: 'Failed to update detail', error: err.message });
  }
});

app.delete('/api/details/:id', [auth, isAdmin], async (req, res) => {
  try {
    const { id } = req.params;
    await Detail.findByIdAndDelete(id);
    res.json({ message: 'Detail deleted' });
  } catch (err) {
    console.error('Detail deletion error:', err);
    res.status(500).json({ message: 'Failed to delete detail', error: err.message });
  }
});

app.get('/api/details/:id', async (req, res) => {
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

app.post('/api/cart', auth, async (req, res) => {
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

app.put('/api/cart/:detailId', auth, async (req, res) => {
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

app.get('/api/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart.detail');
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart.filter(item => item.detail).map(item => ({ ...item.detail.toObject(), quantity: item.quantity })));
  } catch (err) {
    console.error('Cart fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch cart', error: err.message });
  }
});

app.delete('/api/cart/:detailId', auth, async (req, res) => {
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

app.post('/api/purchase', auth, async (req, res) => {
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

app.get('/api/details', async (req, res) => {
  try {
    const { category, priceMin, priceMax, availability, brands, features } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (priceMin || priceMax) filters.price = { $gte: priceMin || 0, $lte: priceMax || 100 };
    if (availability) filters.availability = { $in: availability.split(',') };
    if (brands) filters.brand = { $in: brands.split(',') };
    if (features) filters.features = { $in: features.split(',') };

    const parts = await Part.find(filters);
    res.json(parts);
  } catch (err) {
    console.error('Error fetching parts:', err);
    res.status(500).send('Server Error');
  }
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
