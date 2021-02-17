const router = require('express').Router()
const users = require('./usersRoutes')
const products = require('./productsRoutes')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.use('/', users)
router.use('/products', authenticate, authorize, products)

module.exports = router
