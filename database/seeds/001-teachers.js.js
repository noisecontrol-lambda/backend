
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teachers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('teachers').insert([
        { email: 'michael@example.com', password: '1234', firstName: 'Michael', lastName: 'Hart', title: 'Mr.', theme: 'safari' },
        { email: 'anastasia@example.com', password: '1234', firstName: 'Anastasia', lastName: 'Garciaparra', title: 'Mrs.', theme: 'safari' } 
      ]);
    });
};
