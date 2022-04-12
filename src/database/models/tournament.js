'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tournament.hasMany(models.Team,{
        foreignKey: 'tournamentId',
        as: 'teams'
      });
      Tournament.belongsTo(models.Ascent,{
        foreignKey: 'ascentId',
        as:'ascents'
      });
      Tournament.belongsTo(models.Decline,{
        foreignKey: 'declineId',
        as: 'declines'
      });
      Tournament.belongsTo(models.TypeTournament,{
        foreignKey: 'typeId',
        as: 'typeTournaments'
      });
      Tournament.hasMany(models.Statistic,{
        foreignKey: 'tournamentId',
        as: 'statistics'
      });
      Tournament.hasMany(models.Matchweek,{
        foreignKey: 'tournamentId',
        as:'matchweeks'
      })
      Tournament.hasMany(models.Division,{
        foreignKey: 'tournamentId',
        as: 'Divisions'
      })
      Tournament.hasOne(models.DivisionControl,{
        foreignKey: 'tournamentId',
        as: 'divisionControls'
      })
    }
  }
  Tournament.init({
    name: DataTypes.STRING,
    divisions: DataTypes.INTEGER,
    ascentId: DataTypes.INTEGER,
    declineId: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    typeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};