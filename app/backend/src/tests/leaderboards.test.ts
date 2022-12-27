import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

import MatchesModel from '../database/models/MatchesModel';
import * as matchesMocks from './mocks/matches.mock'
import { ILeaderBoardResponse, IMatchesResponse } from '../interfaces';
import { successfulLoginResponse } from './mocks/login.mock';
import HandleJWT from '../utils/jwt';
import * as leaderboardMocks from './mocks/leaderboard.mock';
import { Model } from 'sequelize';
import { MatchesService } from '../services';

chai.use(chaiHttp);
const { app } = new App();

const { expect } = chai;

describe('A rota /leaderboard...', () => {
  let response: Response;
  
  afterEach(async () => {
    sinon.restore()
  });

  it('do verbo GET deve funcionar corretamente', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(leaderboardMocks.completeLeaderboardMock as any)
    response = await chai.request(app).get('/leaderboard');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(leaderboardMocks.completeLeaderBoardResponse);
  });
});

describe('A rota /leaderboard/home...', () => {
  let response: Response;
  
  afterEach(async () => {
    sinon.restore()
  });

  it('do verbo GET deve funcionar corretamente', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(leaderboardMocks.homeLeaderboardMock as any)
    response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(leaderboardMocks.homeLeaderboardResponse);
  });
});

describe('A rota /leaderboard/away...', () => {
  let response: Response;
  
  afterEach(async () => {
    sinon.restore()
  });

  it('do verbo GET deve funcionar corretamente', async () => {
    sinon.stub(MatchesModel, 'findAll').resolves(leaderboardMocks.awayLeaderboardMock as any)
    response = await chai.request(app).get('/leaderboard/away');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(leaderboardMocks.awayLeaderboardResponse);
  });
});