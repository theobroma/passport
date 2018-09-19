import passport from 'passport';
import Todo from '../models/todo';

export function getTodos(req, res, next) {
  Todo.find()
    .then((data) => {
      res.send(data);
    })
    .catch(err => res.status(500).json({ error: err }));
}

export function getTodoByID(req, res, next) {
  const { id } = req.params;
  Todo.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch(err => res.status(500).json({ error: err }));
}

// export function addTodo(req, res, next) {
//   new Todo(req.body)
//     .save()
//     .then(data => res.json(data))
//     .catch(err => res.status(500).json({ error: err }));
// }
export function addTodo(req, res, next) {
  try {
    const todo = new Todo(req.body);

    todo.save((err, todo) => {
      res.send({
        err,
        todo
      });
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export function removeTodo(req, res, next) {
  try {
    const { id } = req.params;

    Todo.findByIdAndRemove(id, (err, todo) => {
      res.json(todo);
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
// Model.findByIdAndUpdate(id, updateObj, {new: true}, function(err, model) {...
export function toggleTodo(req, res, next) {
  const { completed, text } = req.body;
  try {
    const { id } = req.params;
    Todo.findByIdAndUpdate(
      id,
      {
        $set: {
          completed,
          text
        }
      },
      { new: true },
      (err, todo) => {
        res.json(todo);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export default {
  getTodos,
  addTodo,
  removeTodo,
  getTodoByID,
  toggleTodo
};
