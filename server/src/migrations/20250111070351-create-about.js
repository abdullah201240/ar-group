module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('about', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      chairmanDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      chairmanImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mdDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mdImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mdDigiribDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      mdDigiribImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ourStory: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      ourStoryImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mission: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      vision: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('about');
  },
};
