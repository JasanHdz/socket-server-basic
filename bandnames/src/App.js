import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Band from './components/band';
import BandList from './components/band-list';

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  })
  return socket
}

function App() {
  const [socket] = useState(connectSocketServer())
  const [online, setOnline] = useState(false)
  const [bands, setBands] = useState([])

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])
  
  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])
  
  useEffect(() => {
    socket.on('current_bands', bands => {
      setBands(bands)
    })
  }, [socket])

  const vote = (id) => {
    socket.emit('vote_band', id)
  }

  const removeBand = id => {
    socket.emit('delete_band', id)
  }

  const changeName = (id, name) => {
    socket.emit('change_name_band', {
      id,
      name
    })
  }

  const addBand = (name) => {
    socket.emit('add_band', { name })
  }

  return (
    <div className="container">

      <div>
        <p>
          Services status: 
          {
            online
              ? <span className="text-success"> Online</span>
              : <span className="text-danger"> Offline</span>
          }
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            vote={vote}
            remove={removeBand}
            changeName={changeName}
          />
        </div>
        <div className="col-4">
          <Band addBand={addBand} />
        </div>

      </div>

    </div>
  );
}

export default App;
