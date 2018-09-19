// import db from './db/postgres';
app.get('/todos', (req, res) => {
  db.select().from('todo').then((data) => {
    res.send(data);
  });
});

app.post('/todos', (req, res) => {
  db.insert(req.body).returning('*').into('todo').then((data) => {
    res.send(data);
  });
});

app.patch('/todos/:id', (req, res) => {
  db('todo')
    .where({ id: req.params.id })
    .update(req.body)
    .returning('*')
    .then((data) => {
      res.send(data);
    });
});

app.delete('/todos/:id', (req, res) => {
  db('todo').where({ id: req.params.id }).del().then(() => {
    res.json({ success: true });
  });
});
