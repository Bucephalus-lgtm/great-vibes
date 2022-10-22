const { Router } = require('express');
const { home_get, signup_get, login_get, login_post, logout_get, activateAccount } = require('../controller/auth');
const { signup_post } = require('../controller/mail');
const router = Router();

router.get('/', home_get);
router.get('/signup', signup_get);
router.get('/signin', login_get);
router.post('/signup', signup_post);
router.get('/authentication/activate/:token', activateAccount);
router.post('/signin', login_post)
router.get('/logout', logout_get);

module.exports = router;