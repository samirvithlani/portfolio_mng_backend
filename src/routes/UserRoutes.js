const router = require('express').Router();
const userController = require('../controllers/UserController');
router.post('/create', userController.createUser);
router.get('/get', userController.getUser);
router.get('/get/:id', userController.getUserById);
router.post('/login', userController.loginUser);
module.exports = router;