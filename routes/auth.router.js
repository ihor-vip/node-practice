const router = require('express').Router();

const {authMiddleware} = require('../middlewares');
const {authController} = require('../controllers');

router.post('/', authMiddleware.validateUser, authMiddleware.isPasswordsMatched, authController.login);

module.exports = router;
