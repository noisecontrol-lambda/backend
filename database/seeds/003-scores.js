
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('scores').then(function () {
      // Inserts seed entries
      return knex('scores').insert([
        { classId: 1, createdAt: '2019-07-29 12:55:56', score: 100, streak: 1, theme: 'safari' },
        { classId: 1, createdAt: '2019-07-30 12:55:56', score: 100, streak: 2, theme: 'safari' },
        { classId: 1, createdAt: '2019-07-31 12:55:56', score: 100, streak: 3, theme: 'safari' },
        { classId: 2, createdAt: '2019-07-29 12:55:56', score: 100, streak: 1, theme: 'safari' },
        { classId: 2, createdAt: '2019-07-30 12:55:56', score: 100, streak: 2, theme: 'safari' },
        { classId: 2, createdAt: '2019-07-31 12:55:56', score: 75, streak: 0, theme: 'safari' },
        { classId: 3, createdAt: '2019-07-31 12:55:56', score: 100, streak: 1, theme: 'safari' },
      ]);
    });
};
