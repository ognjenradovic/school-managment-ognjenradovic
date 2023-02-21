'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Students,Schedules,Professors}) {
      this.hasMany(Students, {foreignKey:'classId', hooks: true});
      this.hasOne(Schedules, {foreignKey:'classId',onDelete:'cascade', hooks: true});
      this.belongsTo(Professors, {foreignKey:'classProfessorId', hooks: true});
    }
  }
  Classes.init({
    number: {
      type:DataTypes.INTEGER,
      allowNull: false,
      unique:false
    }
  }, {
    sequelize,
    modelName: 'Classes',
  });
  return Classes;
};