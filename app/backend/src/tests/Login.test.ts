import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Token from '../utils/auth';
// @ts-ignore

import chaiHttp = require('chai-http');
 import *as bcrypt from 'bcryptjs'

import { app } from '../app';
import Users from '../database/models/UsersModel'; 
import { Model } from 'sequelize';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing login endpoints', () => {

 const tokenString ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4MjgxMjc1LCJleHAiOjE2Nzg1NDA0NzV9.5fxRRO4QlvEdgG5BNW7nOyGw47YgwWZ8Pxas3QUW588"
 
 beforeEach(()=>{
  sinon.stub(Token, 'generateToken').returns(tokenString)
 })
  const token =
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjc4MjgxMjc1LCJleHAiOjE2Nzg1NDA0NzV9.5fxRRO4QlvEdgG5BNW7nOyGw47YgwWZ8Pxas3QUW588"
  }

    afterEach(()=>{
      sinon.restore()
    });

   
   
    const user= [ new Users({
        id: 1,
        username: 'Joana',
        role: 'admn',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
      })
    ]


    it('should return 400,when there is no user ',  async function (){
       sinon.stub(Model, 'findOne').resolves(null)
        const response = await chai.request(app).post('/login');
        expect(response.status).to.be.equal(400);

    });

     it('should return 200,when login is succed ',  async function (){
        sinon.stub(Model, 'findOne').resolves(user[0])
        const response = await chai.request(app)
        .post('/login').send({"email":"admin@admin.com", 
        "password":"secret_admin"});
        expect(response.body).to.deep.equal(token);
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

     it('try to do login with invalid password',  async function (){
        const body = {email:'joana@test.com', password:'1'}
        sinon.stub(Model,'findAll').resolves([user[0]]);
        sinon.stub(bcrypt, 'compareSync').resolves(true);
        const response = await chai.request(app).post('/login')
        .send(body);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal({message:'Invalid email or password'});

});

     it('try to do login with invalid email',  async function (){
        const body = {email:'joanatest.com', password:'123456'}
        sinon.stub(Model,'findAll').resolves([user[0]]);
        sinon.stub(bcrypt, 'compareSync').resolves(true);
        const response = await chai.request(app).post('/login')
        .send(body);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal({message:'Invalid email or password'});

});

     it('try to do login with invalid email and password',  async function (){
        const body = {email:'joanatest.com', password:'1'}
        sinon.stub(Model,'findAll').resolves([user[0]]);
        sinon.stub(bcrypt, 'compareSync').resolves(true);
        const response = await chai.request(app).post('/login')
        .send(body);

        expect(response.status).to.be.equal(401);
        expect(response.body).to.deep.equal({message:'Invalid email or password'});

});

});
