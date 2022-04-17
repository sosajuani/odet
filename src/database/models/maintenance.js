'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Maintenance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Maintenance.hasOne(models.Config,{
        foreignKey: 'maintenance',
        as: 'configs'
      })
    }
  }
  Maintenance.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Maintenance',
  });
  return Maintenance;
};