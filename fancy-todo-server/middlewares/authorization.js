const { Todo } = require('../models')

const authorization = function (req, res, next) {
    Todo.findOne({ where: { id: req.params.id } })
        .then(foundTodo => {
            if (foundTodo && foundTodo.userId === req.loggedUser.id) {
                next()
            }
            else {
                next({ status: 401, message: "Unauthorize" })
            }
        })
        .catch(next)
}

module.exports = authorization