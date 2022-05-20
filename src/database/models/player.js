'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.belongsTo(models.Suspension,{
        foreignKey: 'suspensionId',
        as:'suspensions'
      });
      Player.belongsTo(models.Team,{
        foreignKey: 'teamId',
        as: 'teams'
      });
      Player.belongsTo(models.User,{
        foreignKey: 'userId',
        as:'users'
      })
      Player.hasOne(models.Card,{
        foreignKey: 'playerId',
        as: 'cards'
      })
    }
  }
  Player.init({
    goals: DataTypes.INTEGER,
    suspensionId: DataTypes.INTEGER,
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    teamConfirm:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};