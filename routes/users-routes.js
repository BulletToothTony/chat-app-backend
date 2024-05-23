const express = require('express')

const usersControllers = require('../controllers/users-controllers')

const router = express.Router();

router.get('/', usersControllers.getAllUsers)

router.get('/:uid', usersControllers.getSingleUser)

router.patch('/:uid', usersControllers.updateUser)

router.post('/signup', usersControllers.signup)

router.post('/login', usersControllers.login)

module.exports = router;