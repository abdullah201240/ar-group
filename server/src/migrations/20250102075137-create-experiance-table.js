'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('experiance', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      projectsComplete: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      iTProfessionals: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      happyClients: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      yearsOfExpertise: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('experiance');
  },
};
