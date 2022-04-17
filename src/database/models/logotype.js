'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogoType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LogoType.hasOne(models.Config,{
        foreignKey: 'logoType',
        as: 'configs'
      })
    }
  }
  LogoType.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LogoType',
  });
  return LogoType;
};