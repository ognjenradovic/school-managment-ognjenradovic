'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Classes,Apperances,Grades}) {
      this.belongsTo(Classes, {foreignKey: 'classId'});
      this.hasMany(Apperances, {foreignKey:'studentId',onDelete:'cascade', hooks: true});
      this.hasMany(Grades, {foreignKey: 'studentId',onDelete:'cascade', hooks: true});
    }
  }
  Students.init({
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
    modelName: 'Students'
    //,
    // defaultScope: {
    //   attributes:{ exclude: ['email']}
    // }
  });
  return Students;
};