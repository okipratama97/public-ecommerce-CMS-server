'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Name cannot empty' },
          notEmpty: { args: true, msg: 'Name cannot empty' },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Image URL cannot empty' },
          notEmpty: { args: true, msg: 'Image URL cannot empty' },
          isUrl: { args: true, msg: 'Image URL invalid' },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Price cannot empty' },
          notEmpty: { args: true, msg: 'Price cannot empty' },
          isInt: { args: true, msg: 'Price invalid' },
          min: { args: [0], msg: 'Price invalid' },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Stock cannot empty' },
          notEmpty: { args: true, msg: 'Stock cannot empty' },
          isInt: { args: true, msg: 'Stock invalid' },
          min: { args: [0], msg: 'Stock invalid' },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  )
  return Product
}
