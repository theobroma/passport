const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '123',
    database: 'todo_db'
  }
});

module.exports = knex;
