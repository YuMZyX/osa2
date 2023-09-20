const Person = ({ person, handler }) => {
    return (
      <div>
        {person.name} {person.number}
        <button key={person.id} onClick={handler}>delete</button>
      </div>
    )
  }

export default Person