const db = require('../database/dbConfig.js');
const Classes = require('../classes/classes-model');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
};

// Return all teachers, all classes, and all scores in an array of objects
async function find() {
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
  return db('teachers').where(filter);
}

async function add(teacher) {
  await db('teachers').insert(teacher);
  return find();
}

async function findById(id) {
  const teacher = await findBy({ id }).first();
  return teacher || null;
}

async function update(id, changes) {
  const updated = await db('teachers')
    .where({ id })
    .update(changes);
  return updated ? find() : 'Error';
}

async function remove(id) {
  const deleted = await db('teachers')
      .where({ id })
      .del();
  return deleted ? find() : 'Error';
}