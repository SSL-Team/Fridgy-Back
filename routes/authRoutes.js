const router = require('express').Router();
const authControllers = require('../controllers/authControllers');

router.get('/error', authControllers.error);
router.post('/signup', authControllers.signup);
router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);
router.get('/profile', authControllers.profile);

module.exports = router;
