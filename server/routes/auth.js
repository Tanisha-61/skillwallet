
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Farmer = require('../models/Farmer')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body

    if (!name || !phone || !email || !password) {
      return res.status(400).json({
        message: 'Please fill all required fields'
      })
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        message: 'Phone number must contain 10 digits'
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters'
      })
    }

    const existingFarmer = await Farmer.findOne({
      $or: [
        { email: email.toLowerCase() },
        { phone }
      ]
    })

    if (existingFarmer) {
      return res.status(409).json({
        message: 'Email or phone number is already registered'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const farmer = await Farmer.create({
      name,
      phone,
      email: email.toLowerCase(),
      password: hashedPassword
    })

    res.status(201).json({
      message: 'Farmer registered successfully',
      farmer: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Registration failed'
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      })
    }

    const farmer = await Farmer.findOne({
      email: email.toLowerCase()
    })

    if (!farmer) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      farmer.password
    )

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid email or password'
      })
    }

    const token = jwt.sign(
      { id: farmer._id },
      process.env.JWT_SECRET || 'dev_secret_change_before_deployment',
      { expiresIn: '1d' }
    )

    res.json({
      message: 'Login successful',
      token,
      farmer: {
        id: farmer._id,
        name: farmer.name,
        email: farmer.email
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Login failed'
    })
  }
})
router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication token is required'
      })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'dev_secret_change_before_deployment'
    )

    const farmer = await Farmer.findById(decoded.id).select(
      '-password'
    )

    if (!farmer) {
      return res.status(404).json({
        message: 'Farmer not found'
      })
    }

    res.json({
      message: 'Profile fetched successfully',
      farmer
    })
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    })
  }
})
router.get('/profile-test', (req, res) => {
  res.json({
    message: 'Profile route is working!'
  })
})


module.exports = router
