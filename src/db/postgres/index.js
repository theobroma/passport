const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '123',
    database: 'quiz_db'
  }
});

module.exports = knex;
