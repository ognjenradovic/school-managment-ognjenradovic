'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Lessons,Grades}) {
      this.hasMany(Lessons, {foreignKey: 'subjectId'});
      this.hasMany(Grades, {foreignKey: 'subjectId'});
    }
  }
  Subjects.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:false
    },
    book: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:false
    }
  }, {
    sequelize,
    modelName: 'Subjects',
  });
  return Subjects;
};