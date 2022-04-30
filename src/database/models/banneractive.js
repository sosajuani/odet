'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BannerActive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BannerActive.hasOne(models.Banner,{
        foreignKey: 'active',
        as: 'banners'
      })
    }
  }
  BannerActive.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BannerActive',
  });
  return BannerActive;
};