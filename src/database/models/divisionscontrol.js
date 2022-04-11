'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class divisionsControl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  divisionsControl.init({
    tournamentDivisions: DataTypes.INTEGER,
    divisionsCreated: DataTypes.INTEGER,
    tournamentCompleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'divisionsControl',
  });
  return divisionsControl;
};