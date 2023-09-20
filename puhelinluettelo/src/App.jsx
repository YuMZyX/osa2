import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [persons])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const duplicate = persons.find((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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
  // LISÄÄ POISTON VARMISTAMINEN (Windows.confirm)!!!
  const handleDelete = id => {
    personService.erase(id)
    personService
      .getAll()
      .then(updatedPersons => {
        setPersons(updatedPersons)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleFilterEvent} />
      <h2>add a new</h2>
      <PersonForm submit={addPerson} handlerName={handleNameEvent} handlerNumber={handleNumberEvent} 
      name={newName} number={newNumber} />
      <h2>Numbers</h2>
      {Object.values(persons)
      .filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))
      .map(filteredPerson => 
        <Person key={filteredPerson.id} person={filteredPerson} handler={() => handleDelete(filteredPerson.id)} /> 
      )}
    </div>
  )

}

const Person = ({ person, handler }) => {
  return (
    <div>
      {person.name} {person.number}
      <button key={person.id} onClick={handler}>delete</button>
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