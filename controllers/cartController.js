const { Cart, Product } = require('../models')

class CartController {
  static async fetchAllCarts(req, res, next) {
    try {
      const UserId = req.user.id

      const carts = await Cart.findAll({ where: { UserId }, order: [['id']] })
      res.status(200).json(carts)
    } catch (err) {
      next(err)
    }
  }

  static async fetchCart(req, res, next) {
    try {
      const { id } = req.params

      const cart = await Cart.findByPk(id, { include: Product })
      if (!cart) throw { name: 'error_404_cart_not_found' }
      
      res.status(200).json(cart)
    } catch (err) {
      next(err)
    }
  }

  static async addCart(req, res, next) {
    try {
      let { quantity } = req.body
      const UserId = req.user.id
      const ProductId = req.params.productId
      let newCart

      quantity = +quantity
      if (quantity > req.product.stock) throw { name: 'error_400_quantity_exceed_stock' }

      const cart = await Cart.findOne({ where: { ProductId, UserId }, include: Product })
      if (!cart) {
        newCart = await Cart.create({ quantity, UserId, ProductId })
      } 
      else {
        quantity += cart.quantity
        if (quantity > req.product.stock) throw { name: 'error_400_quantity_exceed_stock' }

        let response = await Cart.update({ quantity }, { where: { id: cart.id }, returning: true })
        newCart = response[1][0]
      }
      
      res.status(201).json(newCart)
    } catch (err) {
      next(err)
    }
  }

  static async updateCart(req, res, next) {
    try {
      const { quantity } = req.body
      const { id } = req.params
      console.log(id);
  
      const cart = await Cart.findByPk(id, { include: Product })
      if (!cart) throw { name: 'error_404_cart_not_found' }
      // req.cart = cart
      
      if (quantity > cart.Product.stock) throw { name: 'error_400_quantity_exceed_stock' }

      const response = await Cart.update({ quantity }, { where: { id: id }, returning: true })
      const updatedCart = response[1][0]

      res.status(200).json(updatedCart)
    } catch (err) {
      next(err)
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const id = req.params.id

      const deletedRows = await Cart.destroy({ where: { id } })
      const response = { message: 'Success removing this cart' }

      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CartController