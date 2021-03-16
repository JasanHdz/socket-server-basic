import { useEffect, useState } from "react"

function BandList({ data, vote, remove, changeName }) {
  const [bands, setBands] = useState(data)
  
  useEffect(() => {
    setBands(data)
  }, [data])
  
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
    console.log(id)
    console.log(name)
    // TODO disparar socket
    changeName(id, name)
  }

  const createRows = () => bands.map(({ id, name, votes }) => (
    <tr key={id}>
      <td>
        <button
          onClick={() => vote(id)}
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
          onClick={() => remove(id)}
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
