'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Division extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Division.hasMany(models.Team,{
        foreignKey: 'divisionId',
        as:'teams'
      })
      Division.belongsTo(models.Tournament,{
        foreignKey: 'tournamentId',
        as: 'tournaments'
      })
      Division.hasMany(models.Statistic,{
        foreignKey: 'divisionId',
        as: 'statistics'
      })
    }
  }
  Division.init({
    name: DataTypes.STRING,
    tournamentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Division',
  });
  return Division;
};