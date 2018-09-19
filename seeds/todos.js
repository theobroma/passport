/* eslint func-names:0 */
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('todo').del().then(() => knex('todo').insert([
    {
      id: 1,
      text: 'first PG todo',
      completed: true
    },
    {
      id: 2,
      text: 'second PG todo',
      completed: false
    },
    {
      id: 3,
      text: 'third PG todo',
      completed: false
    },
    {
      id: 4,
      text: 'fourth PG todo',
      completed: false
    },
    {
      id: 5,
      text: 'fifth PG todo',
      completed: false
    }
  ]));
};
