import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  declare readonly id: number;
  declare role : string;
  declare email : string;
  declare password : string;
}

Users.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING(255),
  },
  role: {
    allowNull: false,
    type: STRING(255),
  },
  email: {
    allowNull: false,
    type: STRING(255),
  },
  password: {
    allowNull: false,
    type: STRING(255),
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
