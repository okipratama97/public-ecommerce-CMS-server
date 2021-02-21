const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')
const finder = require('../middlewares/finder')

router.get('/', ProductController.fetchAllProducts)
router.post('/', ProductController.addProduct)
router.use('/:id', finder)
router.get('/:id', ProductController.fetchProduct)
router.put('/:id', ProductController.editProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router
