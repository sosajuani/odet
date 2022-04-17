'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logoType: {
        type: Sequelize.INTEGER,
        references:{
          model: 'LogoTypes',
          key: 'id'
        }
      },
      logoText: {
        type: Sequelize.STRING
      },
      logoImg: {
        type: Sequelize.STRING
      },
      maintenance: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Maintenances',
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
    await queryInterface.dropTable('Configs');
  }
};