const router = require('express').Router()
const users = require('./usersRoutes')
const products = require('./productsRoutes')
const carts = require ('./cartsRoutes')
const authenticate = require('../middlewares/authenticate')
const authorize = require('../middlewares/authorize')

router.use('/', users)
router.use(authenticate)
router.use('/products', authorize, products)
router.use('/carts', carts)

module.exports = router
