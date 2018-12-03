const router = require('express').Router();

// const userControllers = require('../controllers/userControllers');
const ingredientControllers = require('../controllers/ingredientControllers');

router.get('/addIngredients', ingredientControllers.addIngredients);

module.exports = router;
