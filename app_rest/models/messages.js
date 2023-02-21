'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      this.belongsTo(Users, {foreignKey: 'userId'});
    }
  }
  Messages.init({
    content: {type:DataTypes.STRING,
      allowNull: false}
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};