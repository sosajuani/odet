'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sponsor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sponsor.hasOne(models.SponsorActive,{
        foreignKey: 'active',
        as: 'sponsorsActives'
      })
    }
  }
  Sponsor.init({
    image: DataTypes.STRING,
    active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sponsor',
  });
  return Sponsor;
};