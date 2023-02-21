'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Messages}) {
      this.hasMany(Messages, {foreignKey:'userId',onDelete:'cascade', hooks: true});
      // define association here
    }
  }
  Users.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        isEmail:{
          msg: 'Email is not valid'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Users'
    //,
    // defaultScope: {
    //   attributes:{ exclude: ['email']}
    // }
  });
  return Users;
};