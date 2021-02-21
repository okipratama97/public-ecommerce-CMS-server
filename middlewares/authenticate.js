const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = async (req, _, next) => {
  try {
    const access_token = req.headers.access_token
    const payload = verifyToken(access_token)

    const user = await User.findByPk(payload.id)
    if (!user) throw { name: 'error_401_invalid_token' }

    req.user = user

    next()
  } catch (err) {
    next(err)
  }
}
