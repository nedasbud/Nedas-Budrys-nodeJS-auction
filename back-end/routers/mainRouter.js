const express = require('express')
const { register, login, auctions } = require('../controllers/mainController')
const router = express.Router()
const { validateRegistration } = require('../middleware/validator')

router.post('/register', validateRegistration, register)
router.post('/login', login)
router.get('/auctions', auctions)

module.exports = router
