'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Announcments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Notification}) {
      this.hasMany(Notification, {foreignKey:'announcmentID',onDelete:'cascade', hooks: true});
    }
  }
  Announcments.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:false
    }
  }, {
    sequelize,
    modelName: 'Announcments',
  });
  return Announcments;
};