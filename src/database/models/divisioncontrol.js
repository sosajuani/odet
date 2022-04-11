'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DivisionControl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DivisionControl.belongsTo(models.Tournament,{
        foreignKey: 'tournamentId',
        as: 'tournaments'
      })
    }
  }
  DivisionControl.init({
    tournamentDivisions: DataTypes.INTEGER,
    divisionsCreated: DataTypes.INTEGER,
    tournamentId: DataTypes.INTEGER,
    tournamentCompleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DivisionControl',
  });
  return DivisionControl;
};