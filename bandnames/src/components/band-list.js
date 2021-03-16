import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/socket-context"

function BandList() {
  const { socket } = useContext(SocketContext)
  const [bands, setBands] = useState([])
  
  useEffect(() => {
    socket.on('current_bands', bands => {
      setBands(bands)
    })
    return () => socket.off('current_bands')
  }, [socket])
  
  const handleChange = (event, id) => {
    const newName = event.target.value
    setBands(bands => bands.map(band => {
      if (band.id === id) {
        band.name = newName
      }
      return band
    }))
  }

  const handleBlur = (id, name) => {
    socket.emit('change_name_band', { id, name })
  }

  const removeBand = (id) => {
    socket.emit('delete_band', id)
  }

  const voteBand = (id) => {
    socket.emit('vote_band', id)
  }

  const createRows = () => bands.map(({ id, name, votes }) => (
    <tr key={id}>
      <td>
        <button
          onClick={() => voteBand(id)}
          className="btn btn-primary"
        >+1</button>
      </td>
      <td>
        <input
          className="form-control"
          value={name} onChange={event => handleChange(event, id)}
          onBlur={event => handleBlur(id, name)}
        />
      </td>
      <td><h3>{votes}</h3></td>
      <td>
        <button
          onClick={() => removeBand(id)}
          className="btn btn-danger"
        >Borrar</button>
      </td>
    </tr>
  ))
 
  return (
    <tr>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          {createRows()}
        </tbody>
      </table>
    </tr>
  )
}

export default BandList
