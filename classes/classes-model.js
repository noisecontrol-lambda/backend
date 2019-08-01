const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  addScore
};

function find() {
  return db('classes');
}

// Return all teachers, all classes, and all scores in an array of objects
async function findTeachers() {
  // Select all teachers, excluding their password field
  let teachers = await db('teachers').select('id', 'email', 'firstName', 'lastName', 'title', 'theme');
  // Map over the list of teachers, and for each teacher...
  teachers = await Promise.all(teachers.map(async (teacher) => {
    // ...retreive all their associated classes
    const classrooms = await db('classes').where({ teacherId: teacher.id });
    // Mapping over the list of classes, add each class to the teacher object...
    teacher.classes = await Promise.all(classrooms.map(async (classroom) => {
      // ...and include all associated scores for the class
      classroom.scores = await db('scores').where({ classId: classroom.id });
      return classroom;
    }));
    return teacher;
  }));
  return teachers;
}

function findBy(filter) {
  return db('classes').where(filter);
}

async function add(classroom) {
  await db('classes').insert(classroom);
  // return await findById(id);
  return await findTeachers();
}

async function findById(id) {
  const [classes, scores] = await Promise.all([
    db('classes')
      .where({ id })
      .first() || null,
    db('scores')
      .where({ classId: id }) || []
  ]);
  if (classes) classes.scores = scores;
  return classes;
}

async function update(id, changes) {
  const updated = await db('classes')
    .where({ id })
    .update(changes);
  return updated ? findTeachers() : 'Error';
}

async function remove(id) {
  const deleted = await db('classes')
      .where({ id })
      .del();
  return deleted ? findTeachers() : 'Error';
}

async function findScoreById(id) {
  return db('scores')
    .where({ id })
    .first();
}

async function addScore(score) {
  const id = await db('scores').insert(score);
  await db('classes')
    .where({ id: score.classId })
    .update({ streak: score.streak });
  // return await findScoreById(Number(id));
  return await findTeachers();
}