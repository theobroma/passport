// import db from './db/postgres';
import db from '../db/postgres';

const router = require('express').Router();

router.get('/questions', (req, res) => {
  db.select().from('questions').then((data) => {
    res.send(data);
  });
});

module.exports = router;
