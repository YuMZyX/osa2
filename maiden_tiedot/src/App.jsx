import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Render from './components/Render'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [showCountries, setShowCountries] = useState(false)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [countries])

  const handleFilterEvent = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      Find countries: <input value={newFilter} onChange={handleFilterEvent} />
      <div>
        <Render countries={countries} filterer={newFilter} />
      </div>
    </div>
  )
}

export default App
