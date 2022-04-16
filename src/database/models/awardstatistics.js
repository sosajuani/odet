'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AwardStatistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        AwardStatistics.belongsTo(models.User,{
          foreignKey: 'bestPlayer',
          as: 'bestPlayerConsult'
        })
        AwardStatistics.belongsTo(models.User,{
          foreignKey: 'bestScorer',
          as: 'bestScorerConsult'
        })
        //faltan del lado user
        AwardStatistics.belongsTo(models.User,{
          foreignKey: 'bestGoalAssist',
          as: 'bestGoalAssistConsult'
        })
        AwardStatistics.belongsTo(models.User,{
          foreignKey: 'bestGoalKeeper',
          as: 'bestGoalKeeperConsult'
        })
        AwardStatistics.belongsTo(models.Tournament,{
          foreignKey: 'tournamentId',
          as: 'tournaments'
        })
    }
  }
  AwardStatistics.init({
    bestPlayer: DataTypes.INTEGER,
    bestScorer: DataTypes.INTEGER,
    bestGoalAssist: DataTypes.INTEGER,
    bestGoalKeeper: DataTypes.INTEGER,
    tournamentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AwardStatistics',
  });
  return AwardStatistics;
};