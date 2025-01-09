'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('why_digirib', 'designation', 'description');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('why_digirib', 'description', 'designation');
  },
};
