const router = require('express').Router();
const passport = require('../middlewares/auth');
const authRoutes = require('./authRoutes');
const recipesRoutes = require('./recipesRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);
router.use('/recipes', recipesRoutes);
router.use('/user', userRoutes);
//  passport.loggedIn
module.exports = router;
