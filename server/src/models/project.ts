import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/sequelize';  // Sequelize instance


// Define the attributes for the Projects model
interface ProjectAttributes {
  id: number;
  title: string;
  link: string;
  image: string; // Foreign key reference to ProjectCategory
}

// Define the attributes required for creation (without the 'id' field)
interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Projects extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public title!: string;
  public link!: string;
  public image!: string;

}

Projects.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Projects',
    tableName: 'projects',
    timestamps: true,
  }
);




export default Projects;
