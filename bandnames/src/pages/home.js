import { useContext } from 'react'
import { SocketContext } from '../context/socket-context';

import Band from '../components/band'
import BandList from '../components/band-list'
import BandChart from '../components/band-chart';

function HomePage() {

  const { online } = useContext(SocketContext)

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
        <div className="col">
          <BandChart />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <Band />
        </div>

      </div>

    </div>
  );
}

export default HomePage;
