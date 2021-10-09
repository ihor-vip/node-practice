const router = require('express').Router();

const {getUsers, createUser, deleteUser, getUserById} = require('../controllers/user.controller');
const {createUserMiddleware, getUserByIdMiddleware} = require('../middlewares/user.middleware');

router.get('/', getUsers);
router.post('/', createUserMiddleware, createUser);

router.get('/:user_id', getUserByIdMiddleware, getUserById);
router.delete('/:user_id', deleteUser);

module.exports = router;
