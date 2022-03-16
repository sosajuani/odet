'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Report.belongsTo(models.User,{
        foreignKey: 'userId',
        as:'users'
      })
    }
  }
  Report.init({
    userId: DataTypes.INTEGER,
    msg: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};