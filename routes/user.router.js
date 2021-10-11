const router = require('express').Router();

const {getAllUsers, createUser, getOneUser, updateUser, deleteUser} = require('../controllers/user.controller');
const {
    isAllUserPresent,
    validateUserBody,
    checkUniqueEmail,
    isUserPresent,
    validateUserBodyToUpdate,
} = require('../middlewares/user.middleware');

router.get('/', isAllUserPresent, getAllUsers);

router.post('/', validateUserBody, checkUniqueEmail, createUser);

router.get('/:user_id', isUserPresent, getOneUser);

router.put('/:user_id', validateUserBodyToUpdate, isUserPresent, updateUser);

router.delete('/:user_id', isUserPresent, deleteUser);

module.exports = router;
