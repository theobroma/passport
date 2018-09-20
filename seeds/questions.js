/* eslint func-names:0 */
const quizData = require('./data/JS_Quiz_Data.json');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('questions')
    .del()
    .then(() => knex('questions').insert(quizData));
};
