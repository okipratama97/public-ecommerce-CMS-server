'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsTo(models.Product)
    }
  };
  Cart.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Quantity cannot empty' },
        notEmpty: { args: true, msg: 'Quantity cannot empty' },
        isInt: { args: true, msg: 'Quantity invalid' },
        min: { args: [0], msg: 'Quantity invalid' },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'Status cannot empty' },
        notEmpty: { args: true, msg: 'Status cannot empty' },
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Cart',
    hooks: {
      beforeValidate(cart) {
        cart.status = true
      }
    }
  });
  return Cart;
};