/* eslint-disable no-undef */
const { User } = require("../../src/app/models");
const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate')

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to authenticate with valid credentials', async () => {
    const user = await User.create({
      name: "Diegod",
      email: "diegomito@god.com",
      password: "1234",
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1234'
      });
    
    expect(response.status).toBe(200);
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    const user = await User.create({
      name: "Diegod",
      email: "diegomito@god.com",
      password: "1234",
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123432'
      });

    expect(response.status).toBe(401);
  }) 
})