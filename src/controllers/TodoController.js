const BaseController = require("../core/BaseController");
const TodoService = require("../services/TodoServices");

class TodoController extends BaseController {
  constructor(service) {
    super(service);
  }

  // GET /custom/completed
  async getCompletedTodos(req, res) {
    try {
      const todos = await this.service.getCompleted();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // GET /custom/user/:userId
  async getTodosByUser(req, res) {
    try {
      const todos = await this.service.getByUser(req.params.userId);
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // PATCH /custom/toggle/:id
  async toggleComplete(req, res) {
    try {
      const todo = await this.service.toggleComplete(req.params.id);
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // POST / (override create to use logged-in user)
//   Only use this if you're extracting user from req.user (i.e. JWT auth middleware)
  async create(req, res) {
    try {
      const userId = req.user.id; // assuming req.user exists
      const todo = await this.service.createWithUser(req.body, userId);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TodoController(TodoService);
