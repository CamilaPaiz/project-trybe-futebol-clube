import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
 import chaiHttp = require('chai-http');
import { Request, Response, NextFunction } from 'express';
import validatePassword from '../middlewares/validatePassword';

chai.use(chaiHttp);

const { expect } = chai;

describe('validatePassword middleware', () => {
    afterEach(() => {
        sinon.restore();
     });

    it('should return a 400 error if password is missing', async () => {
      const req = {
        body: {}
      } as Request;
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      } as unknown as Response;
      const next = sinon.spy() as NextFunction;
  
      await validatePassword(req, res, next);
  
      expect(res.status).to.be.equal(400);
      expect(res.json).to.be.equal({ message: 'All fields must be filled' });
     
    });
  
    it('should return a 401 error if password is invalid', async () => {
      const req = {
        body: {
          password: 2584
        }
      } as Request;
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      } as unknown as Response;
      const next = sinon.spy() as NextFunction;
  
      await validatePassword(req, res, next);
  
      expect(res.status).to.be.equal(401);
      expect(res.json).to.be.equal({ message: 'Invalid email or password' });
      
    });
  
    it('should call next if password is valid', async () => {
      const req = {
        body: {
          password: '1234567'
        }
      } as Request;
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      } as unknown as Response;
      const next = sinon.spy() as NextFunction;
  
      await validatePassword(req, res, next);
  

      expect(next).to.be.satisfy;
    });
  });
  