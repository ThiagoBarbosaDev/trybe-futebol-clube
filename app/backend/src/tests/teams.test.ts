import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';
import * as teamsMocks from './mocks/teams.mock'

chai.use(chaiHttp);
const { app } = new App();

const { expect } = chai;

describe('A rota /teams...', () => {
  let response: Response;

  beforeEach(async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(teamsMocks.findAllTeamsMock as TeamsModel[])
    sinon.stub(TeamsModel, 'findOne').resolves(teamsMocks.findAllTeamsMock[0] as TeamsModel)
  })

  afterEach(async () => {
    sinon.restore()
  });

  it('deve funcionar corretamente', async () => {
    response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMocks.findAllTeamsMock);
  });
  it('/id deve funcionar corretamente', async () => {
    response = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMocks.findAllTeamsMock[0]);
  });
});
