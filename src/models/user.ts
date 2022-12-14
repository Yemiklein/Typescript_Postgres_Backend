import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { usersGroupInstance } from './userGroup';




interface UserAtrribute {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phonenumber: number;
  password: string;
}

export class UserInstance extends Model<UserAtrribute> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
     
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phonenumber: {
      type: DataTypes.TEXT,
      allowNull: false,

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'userTable',
  },
);

UserInstance.hasMany(usersGroupInstance,{ foreignKey: "userId", as: "groups"});

usersGroupInstance.belongsTo(UserInstance,{ foreignKey: "userId", as: "user"});