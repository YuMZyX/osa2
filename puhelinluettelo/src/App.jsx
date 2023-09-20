import { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNotification, setNewNotification] = useState(null)

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
    const changedNumber = {...duplicate, number: newNumber}
    if (duplicate) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(duplicate.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== duplicate.id ? person : returnedPerson))
          })
        setNewName('')
        setNewNumber('')
        setNewNotification(`Changed number of ${newName}`)
        setTimeout(() => {
          setNewNotification(null)
        }, 5000)
      } else {
        console.log('Replace cancelled')
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNewNotification(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNewNotification(null)
          }, 5000)
        })
    }
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
  
  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      personService.erase(id)
      setNewNotification(`Deleted ${person.name}`)
      setTimeout(() => {
        setNewNotification(null)
      }, 5000)
    } else {
      console.log('Deleting person cancelled')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification} />
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

export default App