import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';
import { roleInstance } from './roles';


interface groupAttribute{
    id:string;
    groupname:string;
    groupdescription:string;
    groupavatar:string;
    
}

export class groupInstance extends Model<groupAttribute>{}
groupInstance.init({
    id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    groupname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    groupdescription:{
        type:DataTypes.STRING,
        allowNull:false
    },
    groupavatar:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
},
    {
        sequelize: db,
        tableName: 'groupTable'
      },
)


groupInstance.hasMany(roleInstance, { foreignKey: "groupId", as: "roles" });
 roleInstance.belongsTo(groupInstance, { foreignKey: "groupId", as: "group" });
