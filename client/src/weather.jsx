import { useState } from 'react'

function getWeatherCondition(code) {
  if (code === 0) {
    return { text: 'Clear Sky', icon: '☀️' }
  }

  if ([1, 2].includes(code)) {
    return { text: 'Partly Cloudy', icon: '🌤️' }
  }

  if (code === 3) {
    return { text: 'Cloudy', icon: '☁️' }
  }

  if ([45, 48].includes(code)) {
    return { text: 'Foggy', icon: '🌫️' }
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return { text: 'Drizzle', icon: '🌦️' }
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { text: 'Rainy', icon: '🌧️' }
  }

  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { text: 'Snowy', icon: '❄️' }
  }

  if ([95, 96, 99].includes(code)) {
    return { text: 'Thunderstorm', icon: '⛈️' }
  }

  return { text: 'Unknown', icon: '🌍' }
}

function Weather() {
  const [city, setCity] = useState('Indore')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function getWeather(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      )

      if (!geoResponse.ok) {
        throw new Error('Could not find the city. Please try again.')
      }

      const geoData = await geoResponse.json()
      const place = geoData.results?.[0]

      if (!place) {
        throw new Error('City not found. Please try another city.')
      }

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
      )

      const data = await response.json()

      if (!response.ok || !data.current) {
        throw new Error('Weather data is unavailable right now.')
      }

      setWeather({
        city: `${place.name}, ${place.country}`,
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m,
        conditionCode: data.current.weather_code,
        time: data.current.time,
      })
    } catch (err) {
      setError(err.message || 'Could not load weather. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="weather-section" id="weather">
      <p className="tagline">WEATHER FOR SMART FARMING</p>
      <h2>Live Weather Updates</h2>
      <p>Check current weather conditions for your farming location.</p>

      <form className="weather-form" onSubmit={getWeather}>
        <label htmlFor="weather-city">Enter city name</label>

        <input
          id="weather-city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. Indore"
          required
        />

        <button className="explore-btn" disabled={loading}>
          {loading ? 'Loading...' : 'Check Weather'}
        </button>
      </form>

      {error && <p className="weather-error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h3>{weather.city}</h3>

          <p>
            {getWeatherCondition(weather.conditionCode).icon}{' '}
            {getWeatherCondition(weather.conditionCode).text}
          </p>

          <p className="weather-temperature">
            {weather.temperature}°C
          </p>

          <p>💧 Humidity: {weather.humidity}%</p>
          <p>💨 Wind speed: {weather.wind} km/h</p>

          <small>
            Updated time: {weather.time.replace('T', ' ')}
          </small>
        </div>
      )}
    </section>
  )
}

export default Weather