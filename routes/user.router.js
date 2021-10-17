const router = require('express')
    .Router();

const {userController} = require('../controllers');

const {
    userMiddleware: {
        checkDataForCreateUser,
        checkDataForUpdateUser,
        getUserByDynamicParam,
        emailValidation,
    }
} = require('../middlewares');

const {
    VAR_ID,
    VAR_ID_DB_FIELD,
    VAR_PARAMS
} = require('../config/config');

router.get('/',
    userController.getAllUsers);

router.post('/',
    checkDataForCreateUser,
    emailValidation,
    userController.createUser);

router.get('/:id',
    getUserByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    userController.getUserById);

router.put('/:id',
    checkDataForUpdateUser,
    getUserByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    userController.updateUser);

router.delete('/:id',
    getUserByDynamicParam(VAR_ID, VAR_PARAMS, VAR_ID_DB_FIELD),
    userController.deleteUser);

module.exports = router;
