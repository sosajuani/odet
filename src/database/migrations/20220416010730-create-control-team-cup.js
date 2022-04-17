'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ControlTeamCups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Teams',
          key: 'id'
        }
      },
      cupId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Cups',
          key: 'id'
        }
      },
      eliminated: {
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
    await queryInterface.dropTable('ControlTeamCups');
  }
};