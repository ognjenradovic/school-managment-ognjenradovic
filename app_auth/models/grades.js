'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Grades extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Students,Subjects}) {
      this.belongsTo(Students, {foreignKey: 'studentId'});
      this.belongsTo(Subjects, {foreignKey: 'subjectId'});
    }
  }
  Grades.init({
    grade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Grades',
  });
  return Grades;
};