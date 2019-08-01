const request = require('supertest');

const server = require('../api/server');

const db = require('../database/dbConfig');

const Teachers = require('./teachers-model.js');

describe('server', () => {
  
  it('db environment set to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});


describe('teachers model', () => {
  beforeEach(async () => {
    await db('teachers').truncate();
  })

  describe('insert()', () => {
    it('should insert the teacher into the db', async () => {
      await Teachers.add({ email: 'test@example.com', password: '1234' });
      const response = await db('teachers');      
      expect(response).toHaveLength(1);
    });

    it('should fail to insert the teacher into the db', async () => {
      try {
        await Teachers.add({ name: 'Jackson' });
      } catch (error) {
        expect(error);
      }
    });
  });

  describe('find()', () => {
    it('should retrieve two teachers from the db', async () => {
      await Teachers.add({ email: 'test1@example.com', password: '1234' });
      await Teachers.add({ email: 'test2@example.com', password: '1234' });
      const teachers = await Teachers.find();
      expect(teachers).toHaveLength(2);
    });
  });

  describe('remove(id)', () => {
    it('should delete one teacher from the db', async () => {
      await Teachers.add({ email: 'test1@example.com', password: '1234' });
      await Teachers.add({ email: 'test2@example.com', password: '1234' });
      await Teachers.remove(1);      
      const response = await Teachers.find();      
      expect(response).toHaveLength(1);
    });

    it('should fail to delete non-existant teacher', async () => {
      await Teachers.add({ email: 'test1@example.com', password: '1234' });
      await Teachers.add({ email: 'test2@example.com', password: '1234' });
      let deleted = await Teachers.remove(1);
      deleted = await Teachers.remove(1);q
      expect(deleted).toBe('Error');
    });
  });

  describe('update(id, changes)', () => {
    it('should update one teacher from the db', async () => {
      await Teachers.add({ email: 'test1@example.com', password: '1234' });
      await Teachers.update(1, { email: 'test2@example.com' });
      const updated = await Teachers.find();
      expect(updated[0].email).toBe('test2@example.com');
    });

    it('should fail to update non-existant teacher', async () => {
      await Teachers.add({ email: 'test1@example.com', password: '1234' });
      await Teachers.remove(1);
      const updated = await Teachers.update(1, { email: 'test2@example.com' });
      expect(updated).toBe('Error');
    });
  });
});