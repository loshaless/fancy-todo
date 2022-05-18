const { Todo } = require('../models');

class todoController {
    static createTodo(req, res, next) {
        let { title, description, status, due_date } = req.body;
        let userId = req.loggedUser.id
        Todo.create({ title, description, status, due_date, userId })
            .then((todo) => {
                res.status(201).json(todo);
            })
            .catch(next)
    }
    static getTodo(req, res, next) {
        let userId = req.loggedUser.id
        Todo.findAll({
            where: { userId },
            order: [
                ['id', 'DESC'],
                ['due_date', 'ASC'],
            ],
        })
            .then(todos => {
                res.status(200).json(todos)
            })
            .catch(next)
    }
    static getTodoById(req, res, next) {
        let id = req.params.id
        Todo.findOne({ where: { id } })
            .then(todo => {
                res.status(200).json(todo)
            })
            .catch(next)
    }
    static putTodoById(req, res, next) {
        let id = req.params.id
        let { title, description, status, due_date } = req.body
        Todo.update({ title, description, status, due_date }, { where: { id }, returning: true })
            .then(todo => {
                let todoById = todo[1][0]
                res.status(200).json(todoById)
            })
            .catch(next)
    }
    static patchTodoById(req, res, next) {
        let id = req.params.id
        let { status } = req.body
        Todo.update({ status }, { where: { id }, returning: true })
            .then(todo => {
                let todoById = todo[1][0]
                res.status(200).json(todoById)
            })
            .catch(next)
    }
    static deleteById(req, res, next) {
        let id = req.params.id
        Todo.destroy({ where: { id }, returning: true })
            .then(() => {
                res.status(200).json({ message: 'todo success to delete' })
            })
            .catch(next)
    }
}

module.exports = todoController;
