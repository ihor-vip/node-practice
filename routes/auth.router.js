const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post(
    '/',
    authMiddleware.validateLoginationData,
    authMiddleware.isUserEmailPresent,
    authController.loginUser
);

router.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout
);

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

router.get('/', authController.renderLoginForm);

module.exports = router;
