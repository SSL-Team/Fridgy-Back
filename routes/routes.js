const router = require('express').Router();
const passport = require('../middlewares/auth');
const authRoutes = require('./authRoutes');
const recipesRoutes = require('./recipesRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);
router.use('/recipes', passport.loggedIn, recipesRoutes);
router.use('/user', passport.loggedIn, userRoutes);

module.exports = router;
