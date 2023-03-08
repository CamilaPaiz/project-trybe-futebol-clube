 import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
 import chaiHttp = require('chai-http');

import { app } from '../app';

import UserService from '../services/UserService'
import Users from '../database/models/UsersModel';
import { Model } from 'sequelize';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing  User', () => {
   
    afterEach(() => {
       sinon.restore();
    });

    const user: Users = new Users ({
        id:1,
        username:'Joana',
        role:'goalkeeper',
        email:'joana@test.com',
        password:'password',
  });

    it('should return a user',  async function (){

       sinon.stub(Model, 'findOne').resolves(user)
        const service = new UserService()
        const result = await service.getById(user.id);
        expect(result).to.be.equal(user)
    
    });
    
}); 