import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
 import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/MatchesModel';
import { Model } from 'sequelize';
import ICreateMatch from '../interfaces/ICreateMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Matches endpoints', () => {

    afterEach(() => {
       sinon.restore();
    });
 
    const expectedOutputMock: Matches[] = [
      new Matches(
      {
          id: 1,
          homeTeamId: 16,
          homeTeamGoals: 1,
          awayTeamId: 8,
          awayTeamGoals: 1,
          inProgress:true
        }),
        new Matches({
          
            id: 41,
            homeTeamId: 16,
            homeTeamGoals: 2,
            awayTeamId: 9,
            awayTeamGoals: 0,
            inProgress: true         
        })
        
  ];

  const inputMock: ICreateMatch ={
          
    homeTeamId: 16, 
    awayTeamId: 8, 
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    
};
const expectedOutputMock1: Matches = 
    
      {
        id: 1,
        homeTeamId: 16,
        homeTeamGoals: 2,
        awayTeamId: 8,
        awayTeamGoals: 2,
        inProgress: true,
      } as Matches;
      

    it('should return the list of matches on /matches',  async function(){
     //when
    sinon.stub(Model, 'findAll').resolves(expectedOutputMock)
      // action
        const res = await chai.request(app).get('/matches');

        //assertion
        expect(res.status).to.be.equal(200);
    });

    it('should create matches on /matches',  async function(){   
      // when
      sinon.stub(Model, 'create').resolves(expectedOutputMock1)
      // action
          const res = await chai.request(app).post('/matches').send(inputMock);
      //assertions
          expect(res.body).to.deep.equal({message: 'Token not found'}); 
      });

});