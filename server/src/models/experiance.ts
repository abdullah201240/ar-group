import { Model, DataTypes, Optional } from 'sequelize';
import db from '../config/sequelize'; // Sequelize instance

// Define the interface for the attributes
interface ExperianceAttributes {
    id: number
    projectsComplete:string
    iTProfessionals: string; 
    happyClients: string;
    yearsOfExpertise: string
}

// Define the optional attributes for creation
interface ExperianceCreationAttributes extends Optional<ExperianceAttributes, 'id'> { }

// Define the Sequelize model class
class Experiance
    extends Model<ExperianceAttributes, ExperianceCreationAttributes>
    implements ExperianceAttributes {
    public id!: number;
    public projectsComplete!: string;
    public iTProfessionals!: string;
    public happyClients!: string;
    public yearsOfExpertise!: string;

}

// Initialize the model
Experiance.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        projectsComplete: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        iTProfessionals: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        happyClients: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        yearsOfExpertise: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db, // Pass the Sequelize instance
        modelName: 'Experiance',
        tableName: 'experiance',
        timestamps: true, // Enables createdAt and updatedAt
    }
);

export default Experiance;
