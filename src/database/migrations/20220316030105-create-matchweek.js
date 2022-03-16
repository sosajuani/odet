'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matchweeks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      localTeamId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'teams',
          key: 'id'
        }
      },
      visitedTeamId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'teams',
          key: 'id'
        }
      },
      tournamentId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'tournaments',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Matchweeks');
  }
};