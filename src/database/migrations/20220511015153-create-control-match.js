'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ControlMatches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tournamentId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Tournaments',
          key: 'id'
        }
      },
      divisionId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Divisions',
          key: 'id'
        }
      },
      matchCreated: {
        type: Sequelize.INTEGER
      },
      matchLimit: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ControlMatches');
  }
};