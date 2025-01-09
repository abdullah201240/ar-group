import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import db from '../config/sequelize'; // Adjust path as needed

// Define the attributes for the About model
export interface AboutAttributes {
  id: number;
  homeDescription: string;
  homeImage: string;
  mission: string;
  vision: string;
  description: string;
  whoWeAreImage: string;
  whoWeAreText: string;
}

// Specify which attributes are optional for model creation
export interface AboutCreationAttributes extends Optional<AboutAttributes, 'id'> {}

// Define the About model class
class About extends Model<AboutAttributes, AboutCreationAttributes> implements AboutAttributes {
  public id!: number;
  public homeDescription!: string;
  public homeImage!: string;
  public mission!: string;
  public vision!: string;
  public description!: string;
  public whoWeAreImage!: string;
  public whoWeAreText!: string;

  // Add any instance-level methods here if needed
}

// Initialize the About model
const AboutModel = (sequelizeInstance: Sequelize): typeof About => {
  About.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      homeDescription: {
        type: DataTypes.STRING(600), // Match max length from Zod schema
        allowNull: false,
      },
      homeImage: {
        type: DataTypes.STRING, // Store valid URLs as strings
        allowNull: false,
      },
      mission: {
        type: DataTypes.STRING(500), // Match max length from Zod schema
        allowNull: false,
      },
      vision: {
        type: DataTypes.STRING(500), // Match max length from Zod schema
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(800), // Match max length from Zod schema
        allowNull: false,
      },
      whoWeAreImage: {
        type: DataTypes.STRING, // Store valid URLs as strings
        allowNull: false,
      },
      whoWeAreText: {
        type: DataTypes.STRING(800), // Match max length from Zod schema
        allowNull: false,
      },
    },
    {
      sequelize: db, // Use the passed `sequelizeInstance`
      modelName: 'About',
      tableName: 'abouts', // Specify table name
      timestamps: true, // Enable `createdAt` and `updatedAt`
    }
  );

  return About;
};

export default AboutModel;
