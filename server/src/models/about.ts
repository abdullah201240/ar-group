import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/sequelize'; // Adjust path as needed

// Define the attributes for the About model
interface AboutAttributes {
  id: number;
  chairmanDescription: string;
  chairmanImage: string;
  mdDescription: string;
  mdImage: string;
  mdDigiribDescription: string;
  mdDigiribImage: string;
  ourStory: string;
  ourStoryImage: string;
  mission: string;
  vision: string;
}

interface AboutCreationAttributes extends Optional<AboutAttributes, 'id'> {}

// Define the About model class
class About
  extends Model<AboutAttributes, AboutCreationAttributes>
  implements AboutAttributes {
  public id!: number;
  public chairmanDescription!: string;
  public chairmanImage!: string;
  public mdDescription!: string;
  public mdImage!: string;
  public mdDigiribDescription!: string;
  public mdDigiribImage!: string;
  public ourStory!: string;
  public ourStoryImage!: string;

  
  public mission!: string;
  public vision!: string;

}

About.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    chairmanDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    chairmanImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mdDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mdImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mdDigiribDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mdDigiribImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ourStory: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mission: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    vision: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ourStoryImage:{
        type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: db, // Use the passed `sequelizeInstance`
    modelName: 'About',
    tableName: 'about', // Specify table name if different from model name
    timestamps: true, // Enable `createdAt` and `updatedAt`
  }
);

export default About;
