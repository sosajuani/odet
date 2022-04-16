'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cup.hasMany(models.ControlTeamCup,{
        foreignKey: 'cupId',
        as: 'controlteamcups'
      })
      Cup.belongsTo(models.FaseCup,{
        foreignKey:'initialFaseId',
        as: 'fasecups'
      })
    }
  }
  Cup.init({
    name: DataTypes.STRING,
    initialFaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cup',
  });
  return Cup;
};