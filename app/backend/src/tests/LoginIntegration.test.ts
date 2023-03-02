import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');
 import *as bcrypt from 'bcryptjs'

import { app } from '../app';
/* import Users from '../database/models/UsersModel'; */
import { Model } from 'sequelize';
import Users from '../database/models/UsersModel';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing login endpoints', () => {
   
    afterEach(() => {
       sinon.restore();
    });

    it('should return 400,when there is no user ',  async function (){

  
    sinon.stub(Model, 'findOne').resolves(null)
        const response = await chai.request(app).post('/login');
        expect(response.status).to.be.equal(400);

    });

     it('should return 200,when login is succed ',  async function (){

        const user: Users = new Users({
            id: 1,
            username: 'Joana',
            role: 'goalkeeper',
            email: 'joana@test.com',
            password: await bcrypt.hash('password', 10),
          });
      
          sinon.stub(Model, 'findOne').resolves(user)
          const response = await chai.request(app).post('/login');
          expect(response.status).to.be.equal(200);
}); 
});