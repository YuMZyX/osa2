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

export default PersonForm