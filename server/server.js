const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Authentication routes
app.use('/api/auth', require('./routes/auth'))

// Backend test route
app.get('/test-auth', (req, res) => {
  res.json({
    message: 'AgriTech backend is running successfully!'
  })
})



mongoose.connect(
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/AgriTech'
)
  .then(() => {
    console.log('MongoDB connected successfully!')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
  })