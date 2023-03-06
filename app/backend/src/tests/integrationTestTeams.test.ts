import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
 import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/TeamsModel';
import { Model } from 'sequelize';



chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Teams endpoints', () => {
   
    afterEach(() => {
       sinon.restore();
    });

    const expectedOutputMock= [
        new Teams({
        id: 1,
        teamName: 'Team Typescript',
        }),
        new Teams({
            id: 2,
            teamName: 'Palmeira',
            },
    )];

    const expectedOneOutput = [
        {
        id: 1,
        teamName: 'Team Typescript',
        },
        {
            id: 2,
            teamName: 'Palmeira',   
        }
    ]

   

    it('should return the list of teams on /teams',  async function (){

        // when
        sinon.stub(Model, 'findAll').resolves(expectedOutputMock)
        //action
        const res = await chai.request(app).get('/teams');
        //assertion
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array')
        expect(res.body).to.deep.equal(expectedOutputMock);
       

    });
     it('should return the a team on /teams/:id',  async function (){

        
        
        sinon.stub(Model, 'findOne').resolves(expectedOutputMock[0])
    
            const res = await chai.request(app).get('/teams/1');
            expect(res.status).to.be.equal(200);
            expect(res.body).to.deep.equal(expectedOutputMock[0].dataValues);
           
    
        }); 
    
});