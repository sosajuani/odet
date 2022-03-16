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
    }
  }
  Matchweek.init({
    localTeamId: DataTypes.INTEGER,
    visitedTeamId: DataTypes.INTEGER,
    tournamentId: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Matchweek',
  });
  return Matchweek;
};