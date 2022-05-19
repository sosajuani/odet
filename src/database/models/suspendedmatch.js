'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuspendedMatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SuspendedMatch.hasMany(models.Matchweek,{
        foreignKey: 'suspendedMatchId',
        as: 'matchWeek'
      })
    }
  }
  SuspendedMatch.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SuspendedMatch',
  });
  return SuspendedMatch;
};