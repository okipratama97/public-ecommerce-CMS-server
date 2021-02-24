'use strict'
const { hash } = require('../helpers/bcrypt')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cart)
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Email cannot empty' },
          notEmpty: { args: true, msg: 'Email cannot empty' },
          isEmail: { args: true, msg: 'Email Invalid' },
        },
        unique: {
          args: true,
          msg: 'Email has been used',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Password cannot empty' },
          notEmpty: { args: true, msg: 'Password cannot empty' },
          len: { args: 8, msg: 'Password length minimum 8' },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { args: true, msg: 'Role cannot empty' },
          notEmpty: { args: true, msg: 'Role cannot empty' },
          isIn: { args: [['Admin', 'Customer']], msg: 'Role Invalid' },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate(value) {
          value.password = hash(value.password)
        },
      },
    }
  )
  return User
}
