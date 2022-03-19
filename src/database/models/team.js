'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.belongsTo(models.Avatar,{
        foreignKey: 'avatarId',
        as: 'avatars'
      });
      Team.belongsTo(models.Tournament,{
        foreignKey: 'tournamentId',
        as: 'tournaments'
      })
      Team.belongsTo(models.Division,{
        foreignKey: 'divisionId',
        as: 'divisions'
      })
      Team.belongsTo(models.User,{
        foreignKey: 'captainId',
        as: 'users'
      });
      Team.hasOne(models.Goal,{
        foreignKey: 'rivalTeamId',
        as:'goals'
      });
      Team.hasMany(models.Player,{
        foreignKey: 'teamId',
        as: 'players'
      });
      Team.hasOne(models.Statistic,{
        foreignKey: 'teamId',
        as:'statistics'
      });
      Team.hasOne(models.Matchweek,{
        foreignKey: 'localTeamId',
        as: 'localTeam'
      });
      Team.hasOne(models.Matchweek,{
        foreignKey: 'visitedTeamId',
        as: 'visitedTeam'
      })
    }
  }
  Team.init({
    name: DataTypes.STRING,
    avatarId: DataTypes.INTEGER,
    captainId: DataTypes.INTEGER,
    tournamentId: DataTypes.INTEGER,	
    divisionId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};