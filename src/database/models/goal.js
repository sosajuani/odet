'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Goal.belongsTo(models.User,{
        foreignKey: 'userId',
        as: 'users'
      })
      Goal.belongsTo(models.Team,{
        foreignKey: 'rivalTeamId',
        as:'teams'
      });
    }
  }
  Goal.init({
    userId: DataTypes.INTEGER,
    rivalTeamId: DataTypes.INTEGER,
    goalsCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Goal',
  });
  return Goal;
};