const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Authentication routes
app.use('/api/auth', require('./routes/auth'));

// Backend test route
app.get('/', (req, res) => {
  res.json({
    message: 'AgriTech backend is running successfully!'
  });
});

app.get('/test-auth', (req, res) => {
  res.json({
    message: 'AgriTech backend is running successfully!'
  });
});

// MongoDB connection
async function startServer() {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is missing in the .env file');
    }

    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully!');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
  }
}

startServer();