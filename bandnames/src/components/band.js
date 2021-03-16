import { useContext, useState } from 'react'
import { SocketContext } from '../context/socket-context'

function Band() {
  const { socket } = useContext(SocketContext)
  const [value, setValue] = useState('')
  const handleSubmit = event => {
    event.preventDefault()
    if (value.trim().length > 0) {
      // TODO: llamar funcion para emitir evento
      socket.emit('add_band', { name: value })
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
