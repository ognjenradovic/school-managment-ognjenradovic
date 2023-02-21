'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Lessons,Classes}) {
    this.hasMany(Lessons, {foreignKey:'scheduleId',hooks: true});
    this.belongsTo(Classes, {foreignKey: 'classId'});
    }
  }
  Schedules.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Schedules',
  });
  return Schedules;
};