import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
 import chaiHttp = require('chai-http');
import { Request, Response, NextFunction } from 'express';
import checkUserExists from '../middlewares/checkUserExist';

chai.use(chaiHttp);

const { expect } = chai;

describe('checkUserExist middleware', () => {
    afterEach(() => {
        sinon.restore();
     });


    it('should return a 401 error if user does not existe on database,but email and password are valids', 
    async () => {
      const req = {
        body: {
          email: 'teste@teste.com',
          password: 258456
        }
      } as Request;
      const res = {
        status: sinon.spy(),
        json: sinon.spy()
      } as unknown as Response;
      const next = sinon.spy() as NextFunction;
  
      await checkUserExists(req, res, next);
  
      expect(res.status).to.be.equal(401);
      expect(res.json).to.be.equal({ message: 'Invalid email or password' });
      
    });
  
  });
  