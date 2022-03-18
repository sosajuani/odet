'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.belongsTo(models.User,{
        foreignKey: "authorId",
        as: 'users'
      })
    }
  }
  News.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    authorId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};