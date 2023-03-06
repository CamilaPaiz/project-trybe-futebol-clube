import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import *as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import ILeaderBoardStatistic from '../interfaces/ILeaderBoardStatistic';
import Matches from '../database/models/MatchesModel';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Leaderboard', () => {
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
        inProgress: true,
        homeTeam: {
          teamName: 'Palmeiras'
        },
        awayTeam: {
          teamName: 'Santos'
        }
      }),
      new Matches({
        
          id: 41,
          homeTeamId: 16,
          homeTeamGoals: 2,
          awayTeamId: 9,
          awayTeamGoals: 0,
          inProgress: true,
          homeTeam: {
            teamName: 'São Paulo'
          },
          awayTeam: {
            teamName: 'Internacional'
          }
      })
      
];

  it('should return a list of the leaderboard', async function () {
    const leaderboard: ILeaderBoardStatistic[] = [
       { 
        name: 'Palmeiras',
        totalPoints: 7,
        totalGames: 3,
        totalVictories: 2,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 10,
        goalsOwn: 5,
        goalsBalance: 5,
        efficiency:'77.78',
    },
          {
            name: 'São Paulo',
            totalPoints: 4,
            totalGames: 2,
            totalVictories: 1,
            totalDraws: 1,
            totalLosses: 0,
            goalsFavor: 4,
            goalsOwn: 1,
            goalsBalance: 3,
            efficiency: '66.67'
          }
        ]
    // when
    sinon.stub(Model, 'findAll').resolves(expectedOutputMock);
    // action
    const response = await chai.request(app).get('/leaderboard/home')
    //assertion
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(leaderboard);
  });
  it('should return a list of the leaderboard', async function () {
    const leaderboard: ILeaderBoardStatistic[] = [
       { 
        name: 'Santos',
        totalPoints: 2,
        totalGames: 2,
        totalVictories: 0,
        totalDraws: 2,
        totalLosses: 0,
        goalsFavor: 3,
        goalsOwn: 3,
        goalsBalance: 0,
        efficiency:'33.33',
    },
          {
            name: 'Internacional',
            totalPoints: 6,
            totalGames: 3,
            totalVictories: 2,
            totalDraws: 0,
            totalLosses: 1,
            goalsFavor: 4,
            goalsOwn: 2,
            goalsBalance: 2,
            efficiency: '66.67'
          }
        ]
    // when
    sinon.stub(Model, 'findAll').resolves(expectedOutputMock);
    // action
    const response = await chai.request(app).get('/leaderboard/away')
    //assertion
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(leaderboard);
  });


}); 