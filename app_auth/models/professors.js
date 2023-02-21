'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Professors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Classes}) {
      this.hasOne(Classes, {foreignKey:'classProfessorId',hooks: true});
    }
  }
  Professors.init({
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
    modelName: 'Professors'
    //,
    // defaultScope: {
    //   attributes:{ exclude: ['email']}
    // }
  });
  return Professors;
};