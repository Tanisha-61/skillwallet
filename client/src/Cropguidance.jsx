import { useState } from 'react'

function CropGuidance() {
  const [soil, setSoil] = useState('Black Soil')
  const [season, setSeason] = useState('Kharif')
  const [water, setWater] = useState('Moderate')
  const [result, setResult] = useState(null)

  const cropData = {
    'Black Soil': {
      Kharif: [
        {
          name: 'Cotton',
          duration: '150–180 days',
          water: 'Moderate to high',
          tip: 'Avoid waterlogging and ensure proper drainage.',
        },
        {
          name: 'Soybean',
          duration: '90–120 days',
          water: 'Moderate',
          tip: 'Sow in moist soil and avoid standing water.',
        },
        {
          name: 'Pigeon Pea',
          duration: '150–180 days',
          water: 'Low to moderate',
          tip: 'Ensure good drainage and control weeds early.',
        },
      ],
      Rabi: [
        {
          name: 'Wheat',
          duration: '110–140 days',
          water: 'Moderate',
          tip: 'Timely irrigation during important growth stages is helpful.',
        },
        {
          name: 'Chickpea',
          duration: '90–120 days',
          water: 'Low to moderate',
          tip: 'Avoid excessive irrigation and waterlogged soil.',
        },
        {
          name: 'Safflower',
          duration: '120–150 days',
          water: 'Low to moderate',
          tip: 'It can tolerate relatively dry conditions once established.',
        },
      ],
    },

    'Alluvial Soil': {
      Kharif: [
        {
          name: 'Rice',
          duration: '100–150 days',
          water: 'High',
          tip: 'Manage field water carefully and avoid unnecessary water use.',
        },
        {
          name: 'Maize',
          duration: '80–120 days',
          water: 'Moderate',
          tip: 'Ensure good drainage and moisture during flowering.',
        },
        {
          name: 'Cotton',
          duration: '150–180 days',
          water: 'Moderate to high',
          tip: 'Choose a locally suitable variety and prevent waterlogging.',
        },
      ],
      Rabi: [
        {
          name: 'Wheat',
          duration: '110–140 days',
          water: 'Moderate',
          tip: 'Plan irrigation around crop growth stages.',
        },
        {
          name: 'Mustard',
          duration: '100–140 days',
          water: 'Low to moderate',
          tip: 'Avoid excessive irrigation, especially near maturity.',
        },
        {
          name: 'Peas',
          duration: '60–100 days',
          water: 'Moderate',
          tip: 'Maintain soil moisture without waterlogging.',
        },
      ],
    },

    'Red Soil': {
      Kharif: [
        {
          name: 'Groundnut',
          duration: '100–130 days',
          water: 'Moderate',
          tip: 'Use well-drained soil and maintain moisture during pod development.',
        },
        {
          name: 'Pearl Millet',
          duration: '75–100 days',
          water: 'Low',
          tip: 'Suitable varieties can perform well in relatively dry conditions.',
        },
        {
          name: 'Pigeon Pea',
          duration: '150–180 days',
          water: 'Low to moderate',
          tip: 'Avoid waterlogging and remove weeds during early growth.',
        },
      ],
      Rabi: [
        {
          name: 'Chickpea',
          duration: '90–120 days',
          water: 'Low to moderate',
          tip: 'Avoid excess irrigation and check soil moisture regularly.',
        },
        {
          name: 'Lentil',
          duration: '100–120 days',
          water: 'Low to moderate',
          tip: 'Select a variety suitable for your local climate and soil.',
        },
      ],
    },

    'Sandy Soil': {
      Kharif: [
        {
          name: 'Pearl Millet',
          duration: '75–100 days',
          water: 'Low',
          tip: 'Use locally recommended drought-tolerant varieties.',
        },
        {
          name: 'Groundnut',
          duration: '100–130 days',
          water: 'Moderate',
          tip: 'Maintain suitable moisture during flowering and pod formation.',
        },
      ],
      Rabi: [
        {
          name: 'Mustard',
          duration: '100–140 days',
          water: 'Low to moderate',
          tip: 'Monitor moisture because sandy soils drain quickly.',
        },
        {
          name: 'Chickpea',
          duration: '90–120 days',
          water: 'Low to moderate',
          tip: 'Avoid overwatering and check soil fertility before sowing.',
        },
      ],
    },
  }

  const getGuidance = (e) => {
    e.preventDefault()

    const crops = cropData[soil]?.[season] || []

    setResult({
      soil,
      season,
      water,
      crops,
    })
  }

  const waterMatches = (cropWater, selectedWater) => {
    if (selectedWater === 'Any') return true

    if (selectedWater === 'Low') {
      return cropWater.toLowerCase().startsWith('low')
    }

    if (selectedWater === 'Moderate') {
      return cropWater.toLowerCase().includes('moderate')
    }

    return cropWater.toLowerCase().includes('high')
  }

  const displayedCrops = result
    ? result.crops.filter((crop) =>
        waterMatches(crop.water, result.water)
      )
    : []

  return (
    <section className="crop-section" id="crop-guidance">
      <p className="tagline">SMART FARMING</p>
      <h2>Crop Guidance Assistant</h2>
      <p>
        Explore general crop options based on soil type,
        growing season and water availability.
      </p>

      <form className="crop-form" onSubmit={getGuidance}>
        <label htmlFor="soil">Soil Type</label>
        <select
          id="soil"
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
        >
          <option>Black Soil</option>
          <option>Alluvial Soil</option>
          <option>Red Soil</option>
          <option>Sandy Soil</option>
        </select>

        <label htmlFor="season">Growing Season</label>
        <select
          id="season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option>Kharif</option>
          <option>Rabi</option>
        </select>

        <label htmlFor="water">Water Availability</label>
        <select
          id="water"
          value={water}
          onChange={(e) => setWater(e.target.value)}
        >
          <option value="Any">Any availability</option>
          <option value="Low">Limited water</option>
          <option value="Moderate">Moderate water</option>
          <option value="High">Good water availability</option>
        </select>

        <button type="submit" className="explore-btn">
          Get Crop Suggestions
        </button>
      </form>

      {result && (
        <div className="crop-result">
          <h3>🌱 Suggested Crops</h3>

          <p>
            <strong>Soil:</strong> {result.soil}
          </p>
          <p>
            <strong>Season:</strong> {result.season}
          </p>

          {displayedCrops.length > 0 ? (
            <div className="crop-list">
              {displayedCrops.map((crop) => (
                <article className="crop-card" key={crop.name}>
                  <h4>🌾 {crop.name}</h4>
                  <p>
                    <strong>Growing duration:</strong>{' '}
                    {crop.duration}
                  </p>
                  <p>
                    <strong>Water requirement:</strong>{' '}
                    {crop.water}
                  </p>
                  <p>
                    <strong>Farming tip:</strong> {crop.tip}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p>
              No matching crops found for this water selection.
              Choose another water availability option.
            </p>
          )}

          <small>
            These are general educational suggestions, not guaranteed
            recommendations. Actual crop suitability depends on your
            location, soil test, variety, rainfall, temperature and
            local agricultural advice.
          </small>
        </div>
      )}
    </section>
  )
}

export default CropGuidance