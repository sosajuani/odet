'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FaseCup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FaseCup.hasMany(models.Cup,{
        foreignKey:'initialFaseId',
        as: 'cups'
      })
    }
  }
  FaseCup.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FaseCup',
  });
  return FaseCup;
};