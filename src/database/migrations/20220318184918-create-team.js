'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      avatarId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Avatars',
          key: 'id'
        }
      },
      captainId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
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
    await queryInterface.dropTable('Teams');
  }
};