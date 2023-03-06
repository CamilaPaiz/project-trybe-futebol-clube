import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import *as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginService from '../services/LoginService';
import UserService from '../services/UserService';
import Users from '../database/models/UsersModel';
import ILoginResponse from '../interfaces/ILoginResponse';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Login', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return a token if login is valid', async function () {
    const user: Users = new Users({
      id: 1,
      username: 'Joana',
      role: 'goalkeeper',
      email: 'joana@test.com',
      password: await bcrypt.hash('password', 10),
    });

    sinon.stub(Users, 'findOne').resolves(user);
    const serviceLogin = new LoginService();
    const resultLogin = await serviceLogin.createLogin(user.email, 'password');
    const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '72h' });
    expect(resultLogin).to.be.equal(token);
  });
   
});
 