'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Config.belongsTo(models.logoType,{
        foreignKey: 'logoType',
        as: 'logoTypes'
      });
      Config.belongsTo(models.Maintenance,{
        foreignKey: 'maintenance',
        as: 'maintenances'
      })
    }
  }
  Config.init({
    logoType: DataTypes.INTEGER,
    logoText: DataTypes.STRING,
    logoImg: DataTypes.STRING,
    maintenance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Config',
  });
  return Config;
};