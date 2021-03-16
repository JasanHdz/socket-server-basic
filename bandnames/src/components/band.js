import { useState } from 'react'

function Band({ addBand }) {
  const [value, setValue] = useState('')
  const handleSubmit = event => {
    event.preventDefault()
    if (value.trim().length > 0) {
      // TODO: llamar funcion para emitir evento
      addBand(value)
      setValue('')
    }
  }
  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="form-control"
          placeholder="nuevo nombre de banda"
        />
      </form>
    </>
  )
}

export default Band
