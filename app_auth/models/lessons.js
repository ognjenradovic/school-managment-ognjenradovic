'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Subjects,Schedules,Classrooms,Apperances}) {
      this.belongsTo(Schedules, {foreignKey: 'scheduleId'});
      this.belongsTo(Subjects, {foreignKey: 'subjectId'});
      this.belongsTo(Classrooms, {foreignKey: 'classroomId'});
      this.hasMany(Apperances, {foreignKey: 'lessonId',onDelete:'cascade', hooks: true});
    }
  }
  Lessons.init({
    number: DataTypes.INTEGER,
    lessonDate: DataTypes.DATE,
    time: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Lessons',
  });
  return Lessons;
};