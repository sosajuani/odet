'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TypeTournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TypeTournament.hasOne(models.Tournament,{
        foreignKey: 'typeId',
        as: 'tournaments'
      })
    }
  }
  TypeTournament.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TypeTournament',
  });
  return TypeTournament;
};