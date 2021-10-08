const router = require('express').Router();

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.createUserMiddleware, userController.createUser);

router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);

router.post('/login', userMiddleware.authUserMiddleware, userController.authUsers);

module.exports = router;
