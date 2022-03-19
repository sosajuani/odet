'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Statistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      teamId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'teams',
          key: 'id'
        }
      },
      played: {
        type: Sequelize.INTEGER
      },
      win: {
        type: Sequelize.INTEGER
      },
      drawn: {
        type: Sequelize.INTEGER
      },
      lost: {
        type: Sequelize.INTEGER
      },
      gf: {
        type: Sequelize.INTEGER
      },
      ga: {
        type: Sequelize.INTEGER
      },
      gd: {
        type: Sequelize.INTEGER
      },
      pts: {
        type: Sequelize.INTEGER
      },
      tournamentId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'tournaments',
          key: 'id'
        }
      },
      divisionId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'divisions',
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
    await queryInterface.dropTable('Statistics');
  }
};