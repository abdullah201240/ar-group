import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/sequelize';

interface ServicesAttributes {
  id: number;
  name: string;
  subTitle:string,
  image: string;
  backgroundImage: string;

}

interface ServicesCreationAttributes
  extends Optional<ServicesAttributes, 'id'> {}

class Services
  extends Model<ServicesAttributes, ServicesCreationAttributes>
  implements ServicesAttributes
{
  public id!: number;
  public name!: string;
  public image!: string;
  public subTitle!: string;
  public backgroundImage!: string;

  
}

Services.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subTitle: {
      type: DataTypes.TEXT,
      allowNull: false,


    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backgroundImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'Services',
    tableName: 'services',
    timestamps: true,
  }
);



export default Services;
