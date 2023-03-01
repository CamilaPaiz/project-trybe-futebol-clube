import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
 import chaiHttp = require('chai-http');

import { app } from '../app';
/* import Users from '../database/models/UsersModel'; */
import { Model } from 'sequelize';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Teams endpoints', () => {
   
    afterEach(() => {
       sinon.restore();
    });

    it('should return 400,when there is no user ',  async function (){

  
    sinon.stub(Model, 'findOne').resolves(null)
        const response = await chai.request(app).post('/login');
        expect(response.status).to.be.equal(400);

    });
});