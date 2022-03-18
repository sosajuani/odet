'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      teamsId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'teams',
          key: 'id'
        }
      },
      divisions: {
        type: Sequelize.INTEGER
      },
      ascentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ascents',
          key: 'id'
        }
      },
      declineId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'declines',
          key: 'id'
        }
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      typeId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'typeTournaments',
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
    await queryInterface.dropTable('Tournaments');
  }
};