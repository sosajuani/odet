'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Avatar,{
        foreignKey: 'avatarId',
        as: 'avatars'
      });
      User.belongsTo(models.Rol,{
        foreignKey: 'rolId',
        as:'rols'
      });
      User.hasOne(models.Team,{
        foreignKey: 'captainId',
        as: 'teams'
      });
      User.hasMany(models.Goal,{
        foreignKey: 'userId',
        as: 'goals'
      });
      User.hasOne(models.Suspension,{
        foreignKey: 'UserId',
        as: 'suspensions'
      });
      User.hasOne(models.Player,{
        foreignKey: 'userId',
        as:'players'
      });
      User.hasMany(models.Report,{
        foreignKey: 'userId',
        as:'reports'
      })
    }
  }
  User.init({
    user: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    pass: DataTypes.STRING,
    avatarId: DataTypes.INTEGER,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};