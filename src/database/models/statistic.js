'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Statistic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Statistic.belongsTo(models.Team,{
        foreignKey: 'teamId',
        as: 'teams'
      });
      Statistic.belongsTo(models.Tournament,{
        foreignKey: 'tournamentId',
        as: 'tournaments'
      })
    }
  }
  Statistic.init({
    teamId: DataTypes.INTEGER,
    played: DataTypes.INTEGER,
    win: DataTypes.INTEGER,
    drawn: DataTypes.INTEGER,
    lost: DataTypes.INTEGER,
    gf: DataTypes.INTEGER,
    ga: DataTypes.INTEGER,
    gd: DataTypes.INTEGER,
    pts: DataTypes.INTEGER,
    tournamentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Statistic',
  });
  return Statistic;
};