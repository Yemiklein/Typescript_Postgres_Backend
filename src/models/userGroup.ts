import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { roleInstance } from './roles';


interface usersGroupAttribute{
    id:string;
    userId:string;
    groupId:string;
    groupname:string;
  
}

export class usersGroupInstance extends Model<usersGroupAttribute>{}
usersGroupInstance.init({
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    userId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    groupId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    groupname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
},
    {
        sequelize: db,
        tableName: 'usersGroupTable'
      },
)



