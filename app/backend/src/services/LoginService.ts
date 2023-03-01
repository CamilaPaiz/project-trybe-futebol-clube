import { ModelStatic } from 'sequelize';

import bcrypt = require('bcryptjs');
import { generateToken } from '../utils/auth';

import Users from '../database/models/UsersModel';
import ILoginResponse from '../interfaces/ILoginResponse';
import ILoginService from '../interfaces/ILoginService';

export default class LoginService implements ILoginService {
  protected model: ModelStatic<Users> = Users;

  async createLogin(email: string, password: string): Promise<ILoginResponse | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const token = generateToken({ id: user.id, role: user.role });
    return { token };
  }
}
