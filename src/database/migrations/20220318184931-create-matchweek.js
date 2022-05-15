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
          model: 'Teams',
          key: 'id'
        }
      },
      visitedTeamId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Teams',
          key: 'id'
        }
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
      date: {
        type: Sequelize.DATEONLY
      },
      time:{
        type: Sequelize.TIME
      },
      journey:{
        type: Sequelize.INTEGER,
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