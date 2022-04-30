'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Banner.hasOne(models.BannerActive,{
        foreignKey: 'active',
        as: 'bannersActives'
      })
    }
  }
  Banner.init({
    image: DataTypes.STRING,
    active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};