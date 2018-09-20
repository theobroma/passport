exports.up = knex => knex.schema.createTable('questions', (table) => {
    table.bigincrements('id').primary();
    table.timestamps(false, true);
    table.string('code').notNullable();
    table.string('question').notNullable();
    table.specificType('answers', 'text[]');
    table.string('correctAnswerData').notNullable();
    table.string('timeBudget').notNullable();
  });

exports.down = knex => knex.schema.dropTableIfExists('questions');
