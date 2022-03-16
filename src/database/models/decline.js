'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Decline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Decline.hasOne(models.Tournament,{
        foreignKey: 'declineId',
        as:'tournaments'
      });
    }
  }
  Decline.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Decline',
  });
  return Decline;
};