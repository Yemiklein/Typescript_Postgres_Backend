import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { usersGroupInstance } from './userGroup';
//import { uuid } from 'uuidv4';

interface UserAtrribute {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phonenumber: number;
  password: string;
  isVerified: boolean;
  avatar: string;
}
//console.log(uuid());
export class UserInstance extends Model<UserAtrribute> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    tableName: 'userTable'
  }
);

 UserInstance.hasMany(usersGroupInstance, { foreignKey: "userId", as: "groups" });
 usersGroupInstance.belongsTo(UserInstance, { foreignKey: "userId", as: "user" });