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
  })

  afterEach(async () => {
    sinon.restore()
  });

  it('deve funcionar corretamente', async () => {
    response = await chai.request(app).post('/login').send()
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
  });
});
// describe('A rota /login/validate...', () => {
//   let response: Response;
  
//   beforeEach(async () => {    
//     sinon.stub(UsersModel, 'findOne').resolves(loginMocks.findOneMock as UsersModel);
//   })
//   afterEach(async () => {
//     sinon.restore()
//   });
//   it('deve funcionar corretamente', async () => {
//     response = await chai.request(app).post('/login').send(loginMocks.validAdmin);
//     const authorization = response.body.token;
//     response = await chai.request(app).get('/login/validate').set({ authorization }).send(loginMocks.validAdmin)

//     expect(response.status).to.be.equal(200);
//     expect(response.body).to.have.property('role').to.contain('admin');
//   });
// });
