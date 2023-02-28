import { ModelStatic } from 'sequelize';
import IUserService from '../interfaces/IUserService';
import Users from '../database/models/UsersModel';

export default class UserService implements IUserService {
  protected model: ModelStatic<Users> = Users;

  async getById(id:number): Promise<Users> {
    const user = await this.model.findOne({ where: { id } });
    if (!user) throw new Error('Invalid email or password');
    return user;
  }
}
