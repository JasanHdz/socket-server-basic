class Sockets {
  constructor(io) {
    this.io = io

    this.socketEvents()
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      // listening event
      socket.on('message_to_server', data => {   
        console.log(data)
        this.io.emit('message_from_server', data)
      })
    })
  }
}

module.exports = Sockets