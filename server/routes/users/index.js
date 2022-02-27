const router = require('express').Router();
const controller = require('./users.controller');
const { isLoggedIn } = require('../middlewares');

router.get('/', controller.getUser);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;