import { useState } from 'react'

function Auth({ onLogin }) {
  const [mode, setMode] = useState('register')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = Object.fromEntries(formData.entries())

    const endpoint =
      mode === 'register' ? 'register' : 'login'

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      )

      const responseText = await response.text()

console.log('Status:', response.status)
console.log('Response:', responseText)

let result

try {
  result = JSON.parse(responseText)
} catch {
  throw new Error(
    'Server ne JSON ke bajay HTML bheja. Console mein Response check karo.'
  )
}

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }

      if (mode === 'login') {
  sessionStorage.setItem('token', result.token)
  sessionStorage.setItem('farmer', JSON.stringify(result.farmer))
  onLogin(result.farmer)
}

      setMessage(result.message)

      if (mode === 'register') {
        form.reset()
      }
    } catch (error) {
      setMessage(
        error.message === 'Failed to fetch'
          ? 'Backend se connection nahi ho raha. Server check karo.'
          : error.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-section" id="farmer-account">
      <div className="auth-card">
        <p className="tagline">WELCOME TO AGRITECH</p>

        <h2>
          {mode === 'register'
            ? 'Farmer Registration'
            : 'Farmer Login'}
        </h2>

        <p>Access digital tools for smarter farming.</p>

        <div className="auth-tabs">
          <button
            type="button"
            onClick={() => {
              setMode('register')
              setMessage('')
            }}
          >
            Register
          </button>

          <button
            type="button"
            onClick={() => {
              setMode('login')
              setMessage('')
            }}
          >
            Login
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <>
              <label htmlFor="farmer-name">Full Name</label>
              <input
                id="farmer-name"
                name="name"
                placeholder="Enter your name"
                required
              />

              <label htmlFor="farmer-phone">Phone Number</label>
              <input
                id="farmer-phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                pattern="[0-9]{10}"
                title="Enter a 10-digit phone number"
                required
              />
            </>
          )}

          <label htmlFor="farmer-email">Email Address</label>
          <input
            id="farmer-email"
            name="email"
            type="email"
            placeholder="Enter email address"
            required
          />

          <label htmlFor="farmer-password">Password</label>
          <input
            id="farmer-password"
            name="password"
            type="password"
            placeholder="Enter password"
            minLength={8}
            required
          />

          <button
            type="submit"
            className="explore-btn"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : mode === 'register'
                ? 'Create Account'
                : 'Login'}
          </button>
        </form>

        {message && (
          <p className="auth-message" role="status">
            {message}
          </p>
        )}
      </div>
    </section>
  )
}

export default Auth