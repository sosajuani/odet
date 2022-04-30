'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SponsorActive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SponsorActive.hasOne(models.Sponsor,{
        foreignKey: 'active',
        as: 'sponsors'
      })
    }
  }
  SponsorActive.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SponsorActive',
  });
  return SponsorActive;
};