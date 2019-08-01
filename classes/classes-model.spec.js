const request = require('supertest');

const server = require('../api/server');

const db = require('../database/dbConfig');

const Classes = require('./classes-model.js');
const Teachers = require('../teachers/teachers-model');

describe('server', () => {
  
  it('db environment set to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

describe('classes model', () => {
  beforeEach(async () => {
    await db('classes').truncate();
    await db('teachers').truncate();
    await Teachers.add({ email: 'testing@example.com', password: '4321' });
  })

  describe('insert()', () => {
    it('should insert the class into the db', async () => {
      await Classes.add({ name: 'First Grade', teacherId: 1 });
      const response = await Classes.find();
      expect(response).toHaveLength(1);
    });

    it('should fail to insert the class into the db', async () => {
      try {
        await Classes.add({ name: 'First Grade' }); // Foreign key missing
      } catch (error) {
        expect(error);
      }
    });
  });

  describe('find()', () => {
    it('should retrieve two classes from the db', async () => {
      await Classes.add({ name: 'First Grade', teacherId: 1 }); 
      await Classes.add({ name: 'Second Grade', teacherId: 1 }); 
      const teachers = await Classes.find();
      expect(teachers).toHaveLength(2);
    });
  });

  describe('remove(id)', () => {
    it('should delete one class from the db', async () => {
      await Classes.add({ name: 'First Grade', teacherId: 1 }); 
      await Classes.add({ name: 'Second Grade', teacherId: 1 }); 
      await Classes.remove(1);      
      const response = await Classes.find();      
      expect(response).toHaveLength(1);
    });

    it('should fail to delete non-existant class', async () => {
      const deleted = await Classes.remove(1);
      expect(deleted).toBe('Error');
    });
  });

  describe('update(id, changes)', () => {
    it('should update one class from the db', async () => {
      await Classes.add({ name: 'First Grade', teacherId: 1 }); 
      await Classes.update(1, { name: 'Second Grade' });
      const updated = await Classes.find();
      expect(updated[0].name).toBe('Second Grade');
    });

    it('should fail to update non-existant class', async () => {
      const updated = await Classes.update(1, { name: 'Second Grade' });
      expect(updated).toBe('Error');
    });
  });

  describe('addScore()', () => {
    it('should insert the scores into the class', async () => {
      await Classes.add({ name: 'First Grade', teacherId: 1 }); 
      const response = await Classes.addScore({ classId: 1, createdAt: '2019-07-30 12:55:56', score: 100, streak: 2, theme: 'safari' });
      expect(response[0].classes[0].scores).toHaveLength(1);
    });

    it('should fail to insert the score into nonexistant class', async () => {
      try {
        await Classes.addScore({ classId: 1, createdAt: '2019-07-30 12:55:56', score: 100, streak: 2, theme: 'safari' });
      } catch (error) {
        expect(error);
      }
    });
  });
  
});