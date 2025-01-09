'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the `subTitle` column after `name`
    await queryInterface.addColumn('services', 'subTitle', {
      type: Sequelize.TEXT,
      allowNull: false, // or true if you want it to be optional
    });

    // Ensure the column order is correct (optional step)
    // Some databases might not support reordering columns directly,
    // but Sequelize doesn't guarantee column order in migrations.
  },

  async down(queryInterface, Sequelize) {
    // Remove the `subTitle` column
    await queryInterface.removeColumn('services', 'subTitle');
  },
};
