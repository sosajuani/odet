'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suspension extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Suspension.belongsTo(models.User,{
        foreignKey: 'UserId',
        as: 'users'
      });
      Suspension.belongsTo(models.Matchweek,{
        foreignKey: 'matchId',
        as:'matchweekes'
      });
      Suspension.hasOne(models.Player,{
        foreignKey: 'suspensionId',
        as: 'players'
      })
    }
  }
  Suspension.init({
    userId: DataTypes.INTEGER,
    matchTime: DataTypes.DATE,
    matchId: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Suspension',
  });
  return Suspension;
};