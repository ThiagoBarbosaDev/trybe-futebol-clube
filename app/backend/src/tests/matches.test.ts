import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

import MatchesModel from '../database/models/MatchesModel';
import * as matchesMocks from './mocks/matches.mock'
import { IMatchesResponse } from '../interfaces';
import { successfulLoginResponse } from './mocks/login.mock';
import HandleJWT from '../utils/jwt';

chai.use(chaiHttp);
const { app } = new App();

const { expect } = chai;

describe('A rota /matches...', () => {
  let response: Response;
  
  afterEach(async () => {
    sinon.restore()
  });
  
  it('do verbo GET deve funcionar corretamente', async () => {
    // todo: fix this typing by removing as unknown.
    sinon.stub(MatchesModel, 'findAll').resolves(matchesMocks.findAllMatchesMock as unknown as IMatchesResponse[])
    response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesMocks.findAllMatchesMock);
  });
  it('do verbo GET deve funcionar corretamente quando filtrando por partidas inProgress como true', async () => {
    const filteredMatches = matchesMocks.findAllMatchesMock.filter((match) => match.inProgress)
    sinon.stub(MatchesModel, 'findAll').resolves(filteredMatches as unknown as IMatchesResponse[])
    response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(filteredMatches);
  });
  it('do verbo GET deve funcionar corretamente quando filtrando por partidas inProgress como false', async () => {
    const filteredMatches = matchesMocks.findAllMatchesMock.filter((match) => !match.inProgress)
    sinon.stub(MatchesModel, 'findAll').resolves(filteredMatches as unknown as IMatchesResponse[])
    response = await chai.request(app).get('/matches?inProgress=true');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(filteredMatches);
  });
  it('do verbo POST deve funcionar corretamente', async () => {
    sinon.stub(MatchesModel, 'create').resolves(matchesMocks.createMatchesMockResponse as MatchesModel)
    sinon.stub(HandleJWT, 'authenticate');
    response = await chai
      .request(app)
      .post('/matches')
      .set('authorization', successfulLoginResponse.token)
      .send(matchesMocks.createMatchesMockPayload);
    expect(response.status).to.be.equal(201);
    const expectedResponse = { ...matchesMocks.createMatchesMockPayload, inProgress: true }
    expect(response.body).to.be.deep.equal(expectedResponse);
  });
  it('do verbo POST deve retornar uma mensagem de erro ao tentar cadastrar um time com id inexistente', async () => {
    sinon.stub(MatchesModel, 'create').resolves(matchesMocks.createMatchesMockResponse as MatchesModel)
    sinon.stub(HandleJWT, 'authenticate');
    response = await chai
      .request(app)
      .post('/matches')
      .set('authorization', successfulLoginResponse.token)
      .send(matchesMocks.createMatchesMockInvalidPayload);
    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message').to.contain('There is no team with such id!');
  });
  it('do verbo POST deve retornar uma mensagem de error ao não inserir um token valido', async () => {
    sinon.stub(MatchesModel, 'create').resolves(matchesMocks.createMatchesMockResponse as MatchesModel)
    response = await chai
      .request(app)
      .post('/matches')
      .send(matchesMocks.createMatchesMockPayload);
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message').to.contain('Token not found');
  });
  it('do verbo POST deve retornar uma mensagem de error ao não inserir um token valido', async () => {
    sinon.stub(MatchesModel, 'create').resolves(matchesMocks.createMatchesMockResponse as MatchesModel)
    response = await chai
      .request(app)
      .post('/matches')
      .set('authorization', 'invalid_token')
      .send(matchesMocks.createMatchesMockPayload);
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message').to.contain('Token must be a valid token');
  });
  it('do verbo POST deve retornar uma mensagem de error ao não inserir um token valido', async () => {
    sinon.stub(MatchesModel, 'update');
    response = await chai
      .request(app)
      .patch('/matches/16/finish')
      .set('authorization', successfulLoginResponse.token)
      .send(matchesMocks.createMatchesMockPayload);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('message').to.contain('finished');
  });
});
