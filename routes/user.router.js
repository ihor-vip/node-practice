const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);

router.get('/:user_id', userController.getUserById);
router.put('/:user_id', userController.updateUserById);
router.delete('/:user_id', userController.deleteUserById);

module.exports = router;
