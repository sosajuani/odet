'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      typeCardId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'TypeCards',
          key: 'id'
        }
      },
      playerId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Players',
          key: 'id'
        }
      },
      matchId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Matchweeks',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cards');
  }
};