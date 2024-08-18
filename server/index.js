require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const detailRoutes = require('./routes/details');
const machineRoutes = require('./routes/machines');
const cartRoutes = require('./routes/cart');
const purchaseRoutes = require('./routes/purchase');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/details', detailRoutes);
app.use('/api/machines', machineRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchase', purchaseRoutes);

app.listen(3001, () => {
  console.log('Server started on port 3001');
});
