const db = require('../database/dbConfig.js');
const Teachers = require('../teachers/teachers-model');

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

function findBy(filter) {
  return db('classes').where(filter);
}

async function add(classroom) {
  const [id] = await db('classes').insert(classroom);
  // return findById(id);
  return await Teachers.find();
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
  try {
    await db('classes')
      .where({ id })
      .update(changes);
  } catch (error) {
    return error;
  }
  // return findById(id);
  return await Teachers.find();
}

async function remove(id) {
  try {
    await db('classes')
      .where({ id })
      .del();
  } catch (error) {
    return error;
  }
  return await Teachers.find();
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
  return await Teachers.find();
}