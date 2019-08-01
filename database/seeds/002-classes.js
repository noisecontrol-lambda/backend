
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex('classes').insert([
        { name: 'Morning Kindergarten', teacherId: 1, theme: 'safari', grade: 'Kindergarten', numberOfKids: 25, streak: 3 },
        { name: 'Afternoon Kindergarten', teacherId: 1, theme: 'safari', grade: 'Kindergarten', numberOfKids: 30, streak: 0 },
        { name: 'First Grade', teacherId: 2, theme: 'safari', grade: '1', numberOfKids: 23, streak: 1 }
      ]);
    });
};
