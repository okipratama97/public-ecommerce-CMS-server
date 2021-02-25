const router = require('express').Router()
const users = require('./usersRoutes')
const products = require('./productsRoutes')
const carts = require ('./cartsRoutes')

router.use('/', users)
router.use('/products', products)
router.use('/carts', carts)

module.exports = router
