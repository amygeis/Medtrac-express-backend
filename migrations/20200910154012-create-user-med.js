'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserMeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: 'UserMedDayIndex',
        allowNull: false
      },
      medId: {
        type: Sequelize.INTEGER,
        unique: 'UserMedDayIndex',
        allowNull: false
      },
      timeId: {
        type: Sequelize.INTEGER,
        unique: 'UserMedDayIndex',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserMeds');
  }
};