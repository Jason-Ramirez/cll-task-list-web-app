const express = require('express');
const AuthController = require('../../controller/v1/AuthController');
const UserController = require('../../controller/v1/UserController');

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register)
router.post('/validateToken', AuthController.validateToken);

router.post('/createTask', UserController.createTask);
router.post('/deleteTask', UserController.deleteTask);
router.get('/getTasks', UserController.getTasks);

module.exports = router;