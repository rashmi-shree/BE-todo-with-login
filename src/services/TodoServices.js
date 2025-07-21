const BaseService = require("../core/BaseService");
const Todo = require("../models/Todo");

class TodoService extends BaseService {
    constructor(model) {
        super(model);
    }

    // Custom method: Get completed todos
    async getCompleted() {
        return this.model.find({ completed: true });
    }

    // Custom method: Get todos by user ID (assuming you store userId in the todo)
    async getByUser(userId) {
        return this.model.find({ userId });
    }

    // Custom method: Toggle complete status
    async toggleComplete(id) {
        const todo = await this.model.findById(id);
        if (!todo) throw new Error("Todo not found");

        todo.completed = !todo.completed;
        return todo.save();
    }

    // Override create to automatically attach userId if needed
    async createWithUser(data, userId) {
        return this.model.create({ ...data, userId });
    }
}

module.exports = new TodoService(Todo);
