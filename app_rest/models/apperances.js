'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apperances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Lessons,Students}) {
      this.belongsTo(Students, {foreignKey: 'studentId'});
      this.belongsTo(Lessons, {foreignKey: 'lessonId'});
    }
  }
  Apperances.init({
    notes: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Apperances',
  });
  return Apperances;
};