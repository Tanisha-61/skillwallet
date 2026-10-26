import { useState, useEffect } from 'react'
import './App.css'
import CropGuidance from './Cropguidance'
import Weather from './weather'
import Auth from './Auth'

function App() {
  const [farmer, setFarmer] = useState(() => {
    try {
      const savedFarmer = sessionStorage.getItem('farmer')
      const token = sessionStorage.getItem('token')

      return token && savedFarmer
        ? JSON.parse(savedFarmer)
        : null
    } catch {
      return null
    }
  })

  function handleLogin(farmerData) {
    setFarmer(farmerData)
  }
  useEffect(() => {
  async function fetchProfile() {
    const token = sessionStorage.getItem('token')

    if (!token) return

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('farmer')
          setFarmer(null)
        }
        return
      }

      setFarmer(data.farmer)
      sessionStorage.setItem(
        'farmer',
        JSON.stringify(data.farmer)
      )
    } catch (error) {
      console.error('Profile fetch failed:', error)
    }
  }

  fetchProfile()
}, [])

  function handleLogout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('farmer')
    setFarmer(null)
  }

  function openAccount() {
    document
      .getElementById('farmer-account')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2>🌱 AgriTech</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>

          {farmer ? (
            <button
              className="login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="login-btn"
              onClick={openAccount}
            >
              Login
            </button>
          )}
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">
            SMART FARMING, BETTER FUTURE
          </p>

          <h1>
            Empowering Farmers Through Digital Technology
          </h1>

          <p className="description">
            Discover smarter farming solutions, access useful
            resources, and grow towards a sustainable
            agricultural future.
          </p>

          <button
            className="explore-btn"
            onClick={() =>
              document
                .getElementById('features')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Explore Features →
          </button>
        </div>

        <div className="hero-icon">🌾</div>
      </section>

      <section className="features" id="features">
        <p className="tagline">WHAT WE OFFER</p>
        <h2>Everything You Need for Smart Farming</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <span>🌦️</span>
            <h3>Weather Updates</h3>
            <p>
              Stay informed about weather conditions
              for better farm planning.
            </p>
          </div>

          <div className="feature-card">
            <span>🌿</span>
            <h3>Crop Guidance</h3>
            <p>
              Explore helpful information to support
              your crop management.
            </p>
          </div>

          <div className="feature-card">
            <span>🧑‍🌾</span>
            <h3>Farmer Resources</h3>
            <p>
              Find useful agricultural resources
              and farming information.
            </p>
          </div>
        </div>
      </section>

      <CropGuidance />
      <Weather />

      <section id="farmer-account" className="auth-section">
        {farmer ? (
          <div className="auth-card">
            <p className="tagline">FARMER DASHBOARD</p>
            <h2>Welcome, {farmer.name}!</h2>
            <p>You are successfully logged in to AgriTech.</p>
            <p>Email: {farmer.email}</p>
            <p>Phone: {farmer.phone}</p>

            <button
              className="explore-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <Auth onLogin={handleLogin} />
        )}
      </section>

      <footer id="about">
        <h3>🌱 AgriTech</h3>
        <p>Technology for farmers. Growth for everyone.</p>
        <p>© 2026 AgriTech Project</p>
      </footer>
    </div>
  )
}

export default App