const express = require("express");
const router = express.Router();
const TodoController = require("../controllers/todoController");
const { protect } = require("../middlewares/authMiddleware")

router.use(protect)

// Base CRUD routes
router.get('/', TodoController.getAll.bind(TodoController));
router.get('/:id', TodoController.getById.bind(TodoController));
router.post('/', TodoController.create.bind(TodoController));
router.put('/:id', TodoController.update.bind(TodoController));
router.delete('/:id', TodoController.delete.bind(TodoController));

// Custom routes
router.get('/custom/completed', TodoController.getCompletedTodos.bind(TodoController));
// If you plan to attach userId from token or query param
router.get('/custom/user/:userId', TodoController.getTodosByUser.bind(TodoController));
router.patch('/custom/toggle/:id', TodoController.toggleComplete.bind(TodoController));

module.exports = router;
