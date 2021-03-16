import React from 'react'
import { SocketProvider } from './context/socket-context'
import HomePage from './pages/home'

function BandNames() {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  )
}

export default BandNames
