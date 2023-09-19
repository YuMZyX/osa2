import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const duplicate = persons.find((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
  }

  const handleNameEvent = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberEvent = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterEvent = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleFilterEvent} />
      <h2>add a new</h2>
      <PersonForm submit={addPerson} handlerName={handleNameEvent} handlerNumber={handleNumberEvent} 
      name={newName} number={newNumber} />
      <h2>Numbers</h2>
      <Persons allPersons={persons} filterer={newFilter} />
    </div>
  )

}

const Persons = ({ allPersons, filterer }) => {
  return (
    <div>
    {allPersons.filter(person => person.name.toUpperCase().includes(filterer.toUpperCase())).map(filteredPerson => (
      <p key={filteredPerson.name}>{filteredPerson.name} {filteredPerson.number}</p>
    ))}
    </div>
  )
}

const Filter = ({ filter, handler }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handler} />
    </div>
  )
}

const PersonForm = ({ submit, handlerName, handlerNumber, name, number }) => {
  return (
    <form onSubmit={submit}>
      <div>name: <input value={name} onChange={handlerName} /></div>
      <div>number: <input value={number} onChange={handlerNumber} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default App