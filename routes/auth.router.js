const authRouter = require('express').Router();

const {authMiddleware} = require('../middlewares');
const {authController} = require('../controllers');

authRouter.post('/',
    authMiddleware.isLoginValid,
    authMiddleware.loginMiddleware,
    authController.login);

module.exports = authRouter;
