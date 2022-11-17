const validEmail = require('email-validator')

module.exports = {
  validateRegistration: (req, res, next) => {
    const { email, passOne, passTwo } = req.body

    if (!validEmail.validate(email)) { return res.send({ error: true, message: 'bad email', data: null }) }

    if (passOne !== passTwo) return res.send({ error: true, message: 'passwords do not match', data: null })
    if (passOne.length < 5 || passOne.length > 20) return res.send({ error: true, message: 'password too long or short', data: null })
    next()
  }
}
