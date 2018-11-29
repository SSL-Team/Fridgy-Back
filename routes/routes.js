const router = require('express').Router();
const authRoutes = require('./authRoutes');
const recipesRoutes = require('./recipesRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);
//router.use('/recipes', recipesRoutes);
//router.use('/user', userRoutes);    

module.exports = router;