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

// async function find() {
//   let teachers = await db('teachers');
//   teachers = await Promise.all(teachers.map(async (teacher) => {
//     delete teacher.password;
//     teacher.classes = [await Classes.findById(Number(teacher.id))];
//     return teacher;
//   }));
//   return teachers;
// }

async function find() {
  let teachers = await db('teachers').select('id', 'email', 'firstName', 'lastName', 'title', 'theme');
  teachers = await Promise.all(teachers.map(async (teacher) => {
    const classrooms = await db('classes').where({ teacherId: teacher.id });
    teacher.classes = await Promise.all(classrooms.map(async (classroom) => {
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
  const [id] = await db('teachers').insert(teacher);

  // return find(ById(id));
  return find();
}

async function findById(teacherId) {
  // const [teacher, classes] = await Promise.all([
  //   db('teachers')
  //     .where({ id: teacherId })
  //     .first() || null,
  //   db('classes')
  //     .where({ teacherId }) || []
  // ]);
  // if (teacher) teacher.classes = classes;
  // return teacher || null;
  const teachers = await find();
  let teacher = teachers.filter(teacher => teacher.id === Number(teacherId));
  return teacher.length ? teacher[0] : null;
}

async function update(id, changes) {
  const updated = await db('teachers')
    .where({ id })
    .update(changes);
  // return findById(id);
  return updated ? find() : 'Error';
}

async function remove(id) {
  const deleted = await db('teachers')
      .where({ id })
      .del();
  return deleted ? find() : 'Error';
}