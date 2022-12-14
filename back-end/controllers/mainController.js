const UserSchema = require('../schemas/userSchema')
const bcrypt = require('bcrypt')

module.exports = {
  register: async (req, res) => {
    const { username, password1 } = req.body
    const userExists = await UserSchema.findOne({ username })
    if (userExists) return res.send({ error: true, message: 'user already exists', data: null })
    const hashed = await bcrypt.hash(password1, 10)
    const newUser = new UserSchema({ username, password: hashed })
    await newUser.save()
    res.send({ error: false, message: 'Sekmingai uzsiregsitravote', data: null })
  },
  login: async (req, res) => {
    const { username, password } = req.body
    const user = await UserSchema.findOne({ username })
    if (!user) return res.send({ error: true, message: 'user not found', data: null })
    const dehash = await bcrypt.compare(password, user.password)
    if (dehash) {
      req.session.username = username
      return res.send({
        error: false,
        message: 'prisijungta sekmingai',
        data: {
          username
        }
      })
    }
    res.send({ error: true, message: 'wrong credentials', data: null })
  },
  auctions: async (req, res) => {
    const { username } = req.session
    if (username) {
      res.send({ error: false, message: 'User is logged in, all good', data: username })
      return
    }
    res.send({ error: true, message: 'You must log in to access this content', data: null })
  }
}
