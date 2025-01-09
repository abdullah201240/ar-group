'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('abouts', 'mission', {
      type: Sequelize.STRING(500),
      allowNull: false,
    });

    await queryInterface.addColumn('abouts', 'vision', {
      type: Sequelize.STRING(500),
      allowNull: false,
    });

    await queryInterface.addColumn('abouts', 'whoWeAreText', {
      type: Sequelize.STRING(800),
      allowNull: false,
    });

    await queryInterface.addColumn('abouts', 'whoWeAreImage', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.removeColumn('abouts', 'homeTitle');
    await queryInterface.removeColumn('abouts', 'homeVideo');
    await queryInterface.removeColumn('abouts', 'title');
    await queryInterface.removeColumn('abouts', 'video');
    await queryInterface.removeColumn('abouts', 'image');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('abouts', 'mission');
    await queryInterface.removeColumn('abouts', 'vision');
    await queryInterface.removeColumn('abouts', 'whoWeAreText');
    await queryInterface.removeColumn('abouts', 'whoWeAreImage');

    await queryInterface.addColumn('abouts', 'homeTitle', {
      type: Sequelize.STRING(55),
      allowNull: false,
    });

    await queryInterface.addColumn('abouts', 'homeVideo', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('abouts', 'title', {
      type: Sequelize.STRING(30),
      allowNull: false,
    });

    await queryInterface.addColumn('abouts', 'video', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addColumn('abouts', 'image', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
