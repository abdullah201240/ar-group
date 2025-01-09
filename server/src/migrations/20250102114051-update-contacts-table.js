'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove 'subject' column
    await queryInterface.removeColumn('contacts', 'subject');
    // Remove 'description' column
    await queryInterface.removeColumn('contacts', 'description');
    // Add 'topic' column
    await queryInterface.addColumn('contacts', 'topic', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add 'subject' column
    await queryInterface.addColumn('contacts', 'subject', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    // Re-add 'description' column
    await queryInterface.addColumn('contacts', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    // Remove 'topic' column
    await queryInterface.removeColumn('contacts', 'topic');
  },
};
