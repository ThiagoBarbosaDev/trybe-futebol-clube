import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import UsersModel from '../database/models/UsersModel';
import * as loginMocks from './mocks/login.mock'

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('A rota /login...', () => {
  let response: Response;

  beforeEach(async () => {
    sinon.stub(UsersModel, 'findOne').resolves(loginMocks.findOneMock as UsersModel)
  })
  afterEach(async () => {
    sinon.restore()
  });

  it('deve funcionar corretamente', async () => {
    response = await chai.request(app).post('/login').send(loginMocks.validAdmin)
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
  });
  it('deve retornar mensagem de erro ao inserir a senha errada', async () => {
    response = await chai.request(app).post('/login').send(loginMocks.invalidAdminPassword);
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message').to.contain('Incorrect email or password');
    expect(response.text).to.not.have.property('token');
  });
  it('deve retornar mensagem de erro ao não inserir a senha', async () => {
    response = await chai.request(app).post('/login').send(loginMocks.emptyAdminPassword);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message').to.contain('All fields must be filled');
    expect(response.text).to.not.have.property('token');
  });
  it('deve retornar mensagem de erro ao inserir um email errado', async () => {
    response = await chai.request(app).post('/login').send(loginMocks.invalidEmail);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message').to.contain('All fields must be filled');
    expect(response.text).to.not.have.property('token');
  });
  it('deve retornar mensagem de erro fazer uma requisição sem email', async () => {
    response = await chai.request(app).post('/login').send(loginMocks.noEmail);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message').to.contain('All fields must be filled');
    expect(response.text).to.not.have.property('token');
  });
});
describe('A rota /login/validate...', () => {
  let response: Response;

  beforeEach(async () => {    
    sinon.stub(UsersModel, 'findOne').resolves(loginMocks.findOneMock as UsersModel);
  })
  afterEach(async () => {
    sinon.restore()
  });

  it('deve funcionar corretamente', async () => {
    response = await chai.request(app).post('/login').send(loginMocks.validAdmin);
    const authorization = response.body.token;
    response = await chai.request(app).get('/login/validate').set({ authorization }).send(loginMocks.validAdmin)
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('role').to.contain('admin');
  });
  it('deve retornar mensagem de error ao não incluir o token', async () => {
    response = await chai.request(app).get('/login/validate').send(loginMocks.validAdmin)
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message').to.contain('Token not found');
  });
});
