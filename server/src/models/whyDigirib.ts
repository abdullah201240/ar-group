import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import db from '../config/sequelize'; // Adjust path as needed

// Define the attributes for the Team model
export interface WhyDigiribAttributes {
  id: number;
  description: string;
  image: string;
}

// Specify which attributes are optional for model creation
export interface WhyDigiribCreationAttributes extends Optional<WhyDigiribAttributes, 'id'> {}

// Define the Team model class
class WhyDigirib extends Model<WhyDigiribAttributes, WhyDigiribCreationAttributes> implements WhyDigiribAttributes {
  public id!: number;
  public description!: string;
  public image!: string;

  // Add any instance-level methods here if needed
}

// Initialize the Team model

    WhyDigirib.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      
      description: {
        type: DataTypes.TEXT, // Matches the designation field in the interface
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING, // Matches the image field in the interface
        allowNull: false,
      },
    },
    {
      sequelize: db, // Use the passed `sequelizeInstance`
      modelName: 'WhyDigirib',
      tableName: 'why_digirib', // Specify table name
      timestamps: true, // Enable `createdAt` and `updatedAt`
    }
  );


export default WhyDigirib;
