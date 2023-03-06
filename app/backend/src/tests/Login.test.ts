import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore

import chaiHttp = require('chai-http');
 import *as bcrypt from 'bcryptjs'

import { app } from '../app';
import Users from '../database/models/UsersModel'; 
import { Model } from 'sequelize';



chai.use(chaiHttp);

const { expect } = chai;

describe('Testing login endpoints', () => {
   
    beforeEach(sinon.restore);
    
    const user= [ new Users({
        id: 1,
        username: 'Joana',
        role: 'admn',
        email: 'admin@admin.com',
        password: 'secret_admin',
      })
    ]

    const token = {
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4MTIzODY3LCJleHAiOjE2NzgzODMwNjd9
      .IHqLFBXxMF62iV_L_fhPNBOgc4Mpb3H29yqAJ3GRf8M`
      }

    it('should return 400,when there is no user ',  async function (){
       sinon.stub(Model, 'findOne').resolves(null)
        const response = await chai.request(app).post('/login');
        expect(response.status).to.be.equal(400);

    });

     it('should return 200,when login is succed ',  async function (){
        const body ={email:'admin@admin.com', password:'secret_admin'}
        sinon.stub(Model,'findAll').resolves([user[0]]);
        sinon.stub(bcrypt, 'compareSync').resolves(true);
       
        const response = await chai.request(app).post('/login')
          .send(body);
        
          expect(response.status).to.be.equal(200);
          expect(response.body).to.be.deep.equal(token);
        
}); 

     it('try to do login without email',  async function (){
        const body = {email:'', password:'secret_admin'}
        sinon.stub(Model,'findAll').resolves([user[0]]);
        sinon.stub(bcrypt, 'compareSync').resolves(true);
        const response = await chai.request(app).post('/login')
        .send(body);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.deep.equal({message:'All fields must be filled'});
}); 
     it('try to do login without password',  async function (){
        const body = {email:'joana@test.com', password:''}
        sinon.stub(Model,'findAll').resolves([user[0]]);
        sinon.stub(bcrypt, 'compareSync').resolves(true);
        const response = await chai.request(app).post('/login')
        .send(body);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.deep.equal({message:'All fields must be filled'});
}); 

});

