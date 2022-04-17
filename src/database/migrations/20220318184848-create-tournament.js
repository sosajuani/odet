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
      divisions: {
        type: Sequelize.INTEGER
      },
      ascentId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Ascents',
          key: 'id'
        }
      },
      declineId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Declines',
          key: 'id'
        }
      },
      startDate: {
        type: Sequelize.DATEONLY
      },
      endDate: {
        type: Sequelize.DATEONLY
      },
      typeId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'TypeTournaments',
          key: 'id'
        }
      },
      season: {
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
    await queryInterface.dropTable('Tournaments');
  }
};