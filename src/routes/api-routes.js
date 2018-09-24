// import db from './db/postgres';
import db from '../db/postgres';

const router = require('express').Router();

router.get('/questions', (req, res) => {
  db.select().from('questions').then((data) => {
    res.send(data);
  });
});

router.get('/users/:id', (req, res) => {
  db('users').where({ id: req.params.id }).returning('*').then((data) => {
    res.send(data);
  });
});

// router.get('/users', (req, res) => {
//   db.select().from('users').then((data) => {
//     res.send(data);
//   });
// });

module.exports = router;
