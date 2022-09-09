import { Model } from 'sequelize';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import users from '../database/models/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  const tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiaWF0IjoxNjYyMDQwOTg2LCJleHAiOjE2NjI2NDU3ODZ9.Xcl63ZuOnXoG0LgxSstzGvCsI-TT2VMdhwPp8teJC1o'

  it('Verificar login', async () => {
    sinon.stub(users, 'findOne').resolves({} as Model);

    const test = await chai.request(app).post('/login').send({
      email: 'user@user.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    }).set('autorization', tokenTest);
    expect(test.status).to.be.eq(200);
    expect(test.body).to.be.an('object');
    sinon.restore();
  });

  it('Verificar login errado', async () => {
    sinon.stub(users, 'findOne').resolves(undefined);

    const test = await chai.request(app).post('/login').send({
      email: 'useruser.com',
      password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
    }).set('autorization', tokenTest);
    expect(test.status).to.be.eq(401);
    sinon.restore();
  });

});



 