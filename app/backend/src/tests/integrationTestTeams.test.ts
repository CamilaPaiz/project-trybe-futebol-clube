import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
 import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsService from '../services/TeamsService'
import Teams from '../database/models/TeamsModel';
import { Model } from 'sequelize';



chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Teams endpoints', () => {
   
    afterEach(() => {
       sinon.restore();
    });

    it('should return the list of teams on /teams',  async function (){

    const expectedOutputMock: Teams[] = [new Teams(
        {
        id: 1,
        teamName: 'Team Typescript',
        },

    )];
    
    sinon.stub(Model, 'findAll').resolves(expectedOutputMock)

        const res = await chai.request(app).get('/teams');
        const expectedPort =3001;
        expect(res.body).to.deep.equal(expectedOutputMock);
        expect(process.env.APP_PORT || 3001).to.equal(expectedPort);

    });
});