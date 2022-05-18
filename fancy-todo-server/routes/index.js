let express = require('express');
let router = express.Router();
const todosRouter = require('./todosRouter')
const userController = require('../controllers/userController')
const holidaysConstroller = require('../controllers/holidayController')

router.use('/todos', todosRouter)

router.post('/signUp', userController.signUp)
router.post('/signIn', userController.signIn)
router.post('/googleLogin', userController.googleLogin)

router.get('/holidays', holidaysConstroller.getHolidays)

module.exports = router;
