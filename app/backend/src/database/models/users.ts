import { DataTypes, Model } from 'sequelize';
import db from '.';

const users = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Users extends Model {}
Users.init(users, {
  tableName: 'users',
  modelName: 'users',
  sequelize: db,
  underscored: true,
  timestamps: false,
});
export default Users;
