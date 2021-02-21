const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
  static async login(req, res, next) {
    try {
      let { email, password } = req.body
      if (!email || !password) throw { name: 'error_400_no_email_password' }

      const user = await User.findOne({ where: { email } })
      if (!user) throw { name: 'error_400_wrong_email_password' }
      if (user.role !== 'Admin') throw { name: 'error_403_not_admin_forbidden' }
      if (!compare(password, user.password))
        throw { name: 'error_400_wrong_email_password' }

      const access_token = generateToken({
        id: user.id,
        email: user.email,
      })
      const response = {
        id: user.id,
        email: user.email,
        access_token,
      }

      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async register(req, res, next) {
    try {
      let { email, password, role } = req.body
      role = role || 'Admin'
      let input = { email, password, role }

      const user = await User.create(input)
      const access_token = generateToken({
        id: user.id,
        email: user.email,
      })
      const response = {
        id: user.id,
        email: user.email,
        access_token,
      }

      res.status(201).json(response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
