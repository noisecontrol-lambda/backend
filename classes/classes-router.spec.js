const request = require('supertest');

const server = require('../api/server');

const db = require('../database/dbConfig');

describe('server', () => {
  
  it('db environment set to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});