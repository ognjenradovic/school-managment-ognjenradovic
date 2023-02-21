'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classrooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Lessons}) {
      this.hasMany(Lessons, {foreignKey: 'classroomId'});
    }
  }
  Classrooms.init({
    number: {
      type:DataTypes.INTEGER,
      allowNull: false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'Classrooms',
  });
  return Classrooms;
};