'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ControlMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ControlMatch.belongsTo(models.Tournament,{
        foreignKey: 'tournamentId',
        as: 'tournaments'
      })
      ControlMatch.belongsTo(models.Division,{
        foreignKey: 'divisionId',
        as: 'divisions'
      })
    }
  }
  ControlMatch.init({
    tournamentId: DataTypes.INTEGER,
    divisionId: DataTypes.INTEGER,
    matchCreated: DataTypes.INTEGER,
    matchLimit: DataTypes.INTEGER,
    date: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ControlMatch',
  });
  return ControlMatch;
};