import { controllers } from '../db';

const router = require('express').Router();

const todosController = controllers && controllers.todos;

router.get('/', todosController.getTodos);
router.get('/:id', todosController.getTodoByID);
router.post('/', todosController.addTodo);
router.delete('/:id', todosController.removeTodo);
router.patch('/:id', todosController.toggleTodo);

module.exports = router;

// router.get('/', (req, res) => {
//   Product.find().then((data) => {
//     res.send(data);
//   });
// });
