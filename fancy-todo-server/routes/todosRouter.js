var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.post('/', todoController.createTodo)

router.get('/', todoController.getTodo)

router.get('/:id', authorization, todoController.getTodoById)

router.put('/:id', authorization, todoController.putTodoById)

router.patch('/:id', authorization, todoController.patchTodoById)

router.delete('/:id', authorization, todoController.deleteById)

module.exports = router