'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      goals: {
        type: Sequelize.INTEGER
      },
      suspensionId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Suspensions',
          key: 'id'
        }
      },
      teamId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Teams',
          key: 'id'
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        }
      },
      teamConfirm: {
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
    await queryInterface.dropTable('Players');
  }
};