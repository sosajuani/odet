'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matchweek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Matchweek.hasOne(models.Suspension,{
        foreignKey: 'matchId',
        as:'suspensions'
      });
      Matchweek.belongsTo(models.Team,{
        foreignKey: 'localTeamId',
        as: 'localTeam'
      });
      Matchweek.belongsTo(models.Team,{
        foreignKey: 'visitedTeamId',
        as: 'visitedTeam'
      });
      Matchweek.belongsTo(models.Tournament,{
        foreignKey: 'tournamentId',
        as: 'tournaments'
      })
      Matchweek.belongsTo(models.Division,{
        foreignKey: 'divisionId',
        as: 'divisions'
      })
      Matchweek.belongsTo(models.SuspendedMatch,{
        foreignKey: 'suspendedMatchId',
        as: 'suspendedMatch'
      })
      Matchweek.hasOne(models.Card,{
        foreignKey: 'matchId',
        as:'cards'
      })
    }
  }
  Matchweek.init({
    localTeamId: DataTypes.INTEGER,
    visitedTeamId: DataTypes.INTEGER,
    tournamentId: DataTypes.INTEGER,
    divisionId: DataTypes.INTEGER,
    date: DataTypes.DATEONLY,
    time: DataTypes.TIME,
    journey: DataTypes.INTEGER,
    localResult: DataTypes.INTEGER,
    visitedResult: DataTypes.INTEGER,
    suspendedMatchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Matchweek',
  });
  return Matchweek;
};