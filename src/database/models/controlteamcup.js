'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ControlTeamCup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ControlTeamCup.belongsTo(models.Team,{
        foreignKey: 'team',
        as:'teams'
      })
      ControlTeamCup.belongsTo(models.Cup,{
        foreignKey: 'cupId',
        as: 'cup'
      })
    }
  }
  ControlTeamCup.init({
    team: DataTypes.STRING,
    cupId: DataTypes.INTEGER,
    eliminated: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ControlTeamCup',
  });
  return ControlTeamCup;
};