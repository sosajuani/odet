'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ascent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ascent.hasOne(models.Tournament,{
        foreignKey: 'ascentId',
        as:'tournaments'
      })
    }
  }
  Ascent.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ascent',
  });
  return Ascent;
};