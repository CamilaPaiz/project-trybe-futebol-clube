import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
 import chaiHttp = require('chai-http');
import { Request, Response, NextFunction } from 'express';
import validateEmail from '../middlewares/validateEmail';

chai.use(chaiHttp);

const { expect } = chai;


describe('validateEmail middleware', () => {
    afterEach(() => {
        sinon.restore();
     });

    it('should return a 400 error if email is missing', async () => {
      const req = {
        body: {}
      } as Request;
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      } as unknown as Response;
      const next = sinon.spy() as NextFunction;
  
      await validateEmail(req, res, next);
  
      expect(res.status).to.be.equal(400);
      expect(res.json).to.be.equal({ message: 'All fields must be filled' });
     
    });
  
    it('should return a 401 error if email is invalid', async () => {
      const req = {
        body: {
          email: 'invalid-email'
        }
      } as Request;
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      } as unknown as Response;
      const next = sinon.spy() as NextFunction;
  
      await validateEmail(req, res, next);
  
      expect(res.status).to.be.equal(401);
      expect(res.json).to.be.equal({ message: 'Invalid email or password' });
      
    });
  
    it('should call next if email is valid', async () => {
      const req = {
        body: {
          email: 'email@test.com'
        }
      } as Request;
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      } as unknown as Response;
      const next = sinon.spy() as NextFunction;
  
      await validateEmail(req, res, next);
  

      expect(next).to.be.satisfy;
    });
  });
  