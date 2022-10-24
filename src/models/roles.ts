import { DataTypes,Model } from "sequelize";
import db from "../config/database.config";


interface roleAttribute{
    id:string;
    groupId:string;
    rolename:string;
    roledescription:string;
    roleavatar:string;
    rolepermissions:boolean;
}

export class roleInstance extends Model<roleAttribute>{}
roleInstance.init({
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    groupId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rolename:{
        type:DataTypes.STRING,
        allowNull:false
    },
    roledescription:{
        type:DataTypes.STRING,
        allowNull:false
    },
    roleavatar:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rolepermissions:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
},
    {
        sequelize: db,
        tableName: 'roleTable'
        },
)