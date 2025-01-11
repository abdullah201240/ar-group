import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/sequelize'; // Adjust path as needed

// Define the attributes for the About model
interface CompanyAttributes {
  id: number;
  description: string;
  description1: string;
  description2: string;
  
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, 'id'> {}

// Define the About model class
class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes {
  public id!: number;
  public description!: string;
  public description1!: string;
  public description2!: string;

}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description2: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize: db, // Use the passed `sequelizeInstance`
    modelName: 'Company',
    tableName: 'companies', // Specify table name if different from model name
    timestamps: true, // Enable `createdAt` and `updatedAt`
  }
);

export default Company;
