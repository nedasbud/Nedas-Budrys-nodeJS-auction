const express = require('express')
const cors = require('cors')
const app = express()
const socketIo = require('socket.io')
const http = require('http').createServer(app)

const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

require('dotenv').config()

http.listen(4000, () => console.log('server is running on port ' + 4000))

app.set('socketio', io)

