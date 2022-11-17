const express = require('express')
const cors = require('cors')
const app = express()
const socketIo = require('socket.io')
const http = require('http').createServer(app)
const session = require('express-session')
const mongoose = require('mongoose')
const router = require('../routers/mainRouter')
require('dotenv').config()
mongoose.connect(process.env.MONGO_KEY)
  .then(() => {
    console.log('ALL GOOD CONNECTION GOOD')
  }).catch((e) => {
    console.log('ERROR', e)
  })

const io = socketIo(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
})

app.use(cors({ origin: 'http://localhost:3000', credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' }))
app.use(express.json())
app.use(
  session({
    secret: 'aukcionasxd',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  })
)
require('dotenv').config()

http.listen(4000, () => console.log('server is running on port ' + 4000))
app.post('/register', router)
app.post('/login', router)
app.get('/auctions', router)

app.set('socketio', io)

const items = [
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 15000,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 16000,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 18000,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 19000,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 19000,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 19000,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 19000,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 19000,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 19000,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 19000,
    bids: []
  }

]

io.on('connect', socket => {
  socket.on('loggedIn', () => {
    console.log('pasieke socketa loggedIn socketas su id: ', socket.id)
    socket.emit('getAuctions', items)
  })
})
