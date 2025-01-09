'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add foreign key to servicesDescription table
    await queryInterface.addConstraint('services_description', {
      fields: ['categoryId'], // The column in services_description
      type: 'foreign key',
      name: 'fk_servicesDescription_categoryId', // Custom constraint name
      references: {
        table: 'services', // The referenced table
        field: 'id', // The referenced column in services
      },
      onDelete: 'CASCADE', // Define what happens on delete
      onUpdate: 'CASCADE', // Define what happens on update
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the foreign key constraint
    await queryInterface.removeConstraint('services_description', 'fk_servicesDescription_categoryId');
  },
};
