const router = require('express').Router();

const {authController} = require('../controllers');
const {
    authMiddleware: {
        verifyUserLogin,
        emailValidation
    }
} = require('../middlewares');

router.post('/',
    verifyUserLogin,
    emailValidation,
    authController.userLogin);

module.exports = router;

