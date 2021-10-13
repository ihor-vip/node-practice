const router = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

router.get('/', userMiddleware.isUsersExist, userController.getUsers);

router.get('/:user_id', userMiddleware.isOneUserExist, userController.getUserById);

router.post('/', userMiddleware.validateUser, userMiddleware.isEmailExist, userController.createUser);

router.put('/:user_id', userMiddleware.validateUserToUpdate, userMiddleware.isOneUserExist, userController.updateUser);

router.delete('/:user_id', userMiddleware.isOneUserExist, userController.deleteUser);

module.exports = router;
