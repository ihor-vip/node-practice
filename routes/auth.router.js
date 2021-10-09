const router = require('express').Router();

const {authorizationUserMiddleware} = require('../middlewares/auth.middleware');
const {authorizationUser} = require('../controllers/auth.controller');

router.post('/', authorizationUserMiddleware, authorizationUser);

module.exports = router;
