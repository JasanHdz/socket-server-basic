import { useEffect, useMemo, useState } from 'react'
import io from 'socket.io-client'

export const useSocket = (serverPaht) => {
  const socket = useMemo(() => io.connect(serverPaht, {
    transports: ['websocket']
  }), [serverPaht])
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

  // useEffect(() => {
  //   socket.on('current_bands', bands => {
  //     setBands(bands)
  //   })
  //   return () => socket.off('current_bands')
  // }, [socket])


  return {
    socket,
    online,
  }
}