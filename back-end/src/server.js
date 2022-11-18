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
app.post('/auctions/add', router)

app.set('socketio', io)

// Keli itemai kad nebutu tuscia paleidus

let items = [
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 30,
    price: 1500,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 50,
    price: 160,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 60,
    price: 1800,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 100,
    price: 190,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 120,
    price: 19,
    bids: []
  },
  {
    img: 'https://oldschool.runescape.wiki/images/thumb/Rune_scimitar_detail.png/130px-Rune_scimitar_detail.png?c8823',
    title: 'Rune Scimitar',
    time: 300,
    price: 1999,
    bids: []
  }
]

// Constantly sukasi aukcionas

const finishAuction = (i) => {
  const itemsCopy = items.filter((item, idx) => idx !== i)
  items = itemsCopy
}

setInterval(() => {
  items.forEach((item, i) => {
    item.time--
    if (item.time === 0 || item.time < 0) finishAuction(i)
  })
}, 1000)

// Gabaliukas kodo, kad aukcionas kas 20 sekundziu pildytusi random itemais
const images = [
  'https://oldschool.runescape.wiki/images/thumb/Runite_bar_detail.png/120px-Runite_bar_detail.png?b7cd3',
  'https://oldschool.runescape.wiki/images/thumb/Death_rune_detail.png/120px-Death_rune_detail.png?716ba',
  'https://oldschool.runescape.wiki/images/thumb/Rune_full_helm_detail.png/120px-Rune_full_helm_detail.png?3d62b',
  'https://oldschool.runescape.wiki/images/thumb/Dragon_spear_detail.png/100px-Dragon_spear_detail.png?cdef4',
  'https://oldschool.runescape.wiki/images/thumb/Dragon_spear_detail.png/100px-Dragon_spear_detail.png?cdef4',
  'https://oldschool.runescape.wiki/images/thumb/Kodai_insignia_detail.png/120px-Kodai_insignia_detail.png?b699d',
  'https://oldschool.runescape.wiki/images/thumb/Craw%27s_bow_%28u%29_detail.png/180px-Craw%27s_bow_%28u%29_detail.png?bf1fd',
  'https://oldschool.runescape.wiki/images/thumb/Viggora%27s_chainmace_%28u%29_detail.png/170px-Viggora%27s_chainmace_%28u%29_detail.png?cbd46',
  'https://oldschool.runescape.wiki/images/thumb/Battlestaff_detail.png/120px-Battlestaff_detail.png?c5b58',
  'https://oldschool.runescape.wiki/images/thumb/Uncharged_trident_detail.png/150px-Uncharged_trident_detail.png?c0ec2',
  'https://oldschool.runescape.wiki/images/thumb/Raw_shark_detail.png/150px-Raw_shark_detail.png?a4a2c'
]
setInterval(() => {
  items.push({
    img: images[Math.round(Math.random() * 10)],
    title: 'selling my bank',
    price: Math.round(Math.random() * 1000 + 1),
    time: Math.round(Math.random() * 400 + 5),
    bids: []
  })
}, 20000)

io.on('connect', socket => {
  setInterval(() => {
    socket.emit('getAuctions', items)
  }, 1000)

  socket.on('uploadItem', data => {
    const newItem = {
      img: data.img,
      title: data.title,
      time: data.time,
      price: data.price,
      bids: []
    }
    items.push(newItem)
    console.log(newItem)
    socket.emit('getAuctions', items)
  })

  socket.on('getOne', data => {
    socket.emit('getOne', items[data])
  })

  socket.on('placeBet', data => {
    const { bet, id, user } = data
    console.log(data)
    items[id].price = bet
    items[id].bids.push({ bet, user })
  })
})

module.exports = { items }
