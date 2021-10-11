const router = require('express').Router();

const {validateUser, ifEmailExist} = require('../middlewares/auth.middleware');
const {login} = require('../controllers/auth.controller');

router.post('/', validateUser, ifEmailExist, login);

module.exports = router;
