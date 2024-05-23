const express = require('express')

const usersControllers = require('../controllers/users-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', usersControllers.getAllUsers)

router.get('/:uid', usersControllers.getSingleUser)

router.post('/signup', usersControllers.signup)

router.post('/login', usersControllers.login)

router.use(checkAuth)

router.patch('/:uid', usersControllers.updateUser)



module.exports = router;