import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/sequelize'; // Adjust path as needed

// Define the attributes for the Services model
export interface ServicesDescriptionAttributes {
  id: number;
  title: string;
  description: string;
  categoryId: number;
}

// Specify which attributes are optional for model creation
export interface ServicesDescriptionCreationAttributes extends Optional<ServicesDescriptionAttributes, 'id'> {}

// Define the Services model class
class ServicesDescription extends Model<ServicesDescriptionAttributes, ServicesDescriptionCreationAttributes> implements ServicesDescriptionAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public categoryId!: number;

}


  ServicesDescription.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING, // Matches the title field in the interface
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT, // Matches the description field in the interface
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER, 
        allowNull: false,

      },
    },
    {
      sequelize: db, // Use the passed `sequelizeInstance`
      modelName: 'ServicesDescription',
      tableName: 'services_description', // Specify table name
      timestamps: true, // Enable `createdAt` and `updatedAt`
    }
  );


export default ServicesDescription;
