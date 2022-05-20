'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Card.belongsTo(models.TypeCard,{
        foreignKey: 'TypeCardId',
        as: 'typeCards'
      })
      Card.belongsTo(models.User,{
        foreignKey: 'userId',
        as: 'users'
      });
      Card.belongsTo(models.Matchweek,{
        foreignKey: 'matchId',
        as: 'matchWeeks'
      });
    }
  }
  Card.init({
    TypeCardId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};