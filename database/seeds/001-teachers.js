
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teachers').del()
    .then(function () {
      // Inserts seed entries
      return knex('teachers').insert([
        { email: 'michael@example.com', password: '$2a$10$XNhVj5HP7tf92Jq9jOhVHu1nMZqPBHL2lRPVX8jxWmVyPa6HrhsO2', firstName: 'Michael', lastName: 'Hart', title: 'Mr.', theme: 'safari' },
        { email: 'anastasia@example.com', password: '$2a$10$4f4jQqGu9K/54cpTudbT6ehEUfRIEFKx2gvWkKn7hSWSj2iSf36Sm', firstName: 'Anastasia', lastName: 'Garciaparra', title: 'Mrs.', theme: 'safari' } 
      ]);
    });
};
