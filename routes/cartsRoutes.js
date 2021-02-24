const router = require('express').Router()
const CartController = require('../controllers/cartController')
const finder = require('../middlewares/finder')

router.get('/', CartController.fetchAllCarts)
router.post('/:productId',finder, CartController.addCart)
router.get('/:id', CartController.fetchCart)
router.patch('/:id', CartController.updateCart)
router.delete('/:id', CartController.deleteCart)

module.exports = router
