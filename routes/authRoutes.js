const { Router } = require('express');
const auth = require('../controllers/auth');
const router = Router();

router.get('/signup', auth.signup_get);
router.post('/signup', auth.signup_post);
router.get('/login', auth.login_get);
router.post('/login', auth.login_post);
router.get('/logout', auth.logout_get);

module.exports = router;
