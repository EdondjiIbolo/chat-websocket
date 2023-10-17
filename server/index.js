import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

io.on('connection', (socket) => {
  const username = socket.handshake.auth.username ?? 'anonymus'
  console.log('un usuario se ha conectado' + username)
  socket.on('disconnect', () => {
    console.log('un usuario se ha desconectado')
  })

  socket.on('chat', (msg) => {
    if (msg) {
      io.emit('chat', msg, username)
      console.log('mensaje :' + msg)
    }
  })
})

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log(`Server start up in http://localhost:${port}`)
})
