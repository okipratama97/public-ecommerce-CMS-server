const { Product } = require('../models')

module.exports = async (req, _, next) => {
  try {
    let id = req.params.id || req.params.productId

    const product = await Product.findByPk(id)
    if (!product) throw { name: 'error_404_product_not_found' }
    req.product = product

    next()
  } catch (err) {
    next(err)
  }
}
