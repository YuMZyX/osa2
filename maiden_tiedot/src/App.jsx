import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Render from './components/Render'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

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

  const handleShow = (name) => {
    setNewFilter(name)
  }

  return (
    <div>
      Find countries: <input value={newFilter} onChange={handleFilterEvent} />
      <div>
        <Render countries={countries} filterer={newFilter} handler={handleShow} />
      </div>
    </div>
  )
}

export default App
