'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Announcments}) {
      this.belongsTo(Announcments, {foreignKey: 'announcmentID'});
    }
  }
  Notification.init({
    content: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:false
    }
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};