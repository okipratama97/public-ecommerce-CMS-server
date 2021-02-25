const { Product } = require('../models')

class ProductController {
  static async fetchAllProducts(req, res, next) {
    try {
      console.log('fetchall')
      const products = await Product.findAll({ order: [['id']] })
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  }

  static async fetchProduct(req, res, next) {
    try {
      const product = req.product
      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async addProduct(req, res, next) {
    try {
      const { name, image_url, price, stock } = req.body
      const input = { name, image_url, price, stock }

      const newProduct = await Product.create(input, { returning: true })

      res.status(201).json(newProduct)
    } catch (err) {
      next(err)
    }
  }

  static async editProduct(req, res, next) {
    try {
      const id = req.params.id
      const { name, image_url, price, stock } = req.body
      const input = { name, image_url, price, stock }

      const data = await Product.update(input, {
        where: { id },
        returning: true,
      })
      const product = data[1][0]

      res.status(200).json(product)
    } catch (err) {
      next(err)
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id

      const deletedRows = await Product.destroy({ where: { id } })
      const response = req.product

      res.status(200).json(response)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = ProductController
