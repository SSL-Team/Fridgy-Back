const axios = require('axios');
const models = require('../models');
const dotenv = require('dotenv').load();

const { User } = models;
const { Ingredient } = models;
const API_KEY = process.env.API_KEY;

const instance = axios.create({
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/',
  headers: {
    'X-Mashape-Key': API_KEY,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

module.exports.recipesByMissing = function recipesByMissingExport(req, res) {
  Ingredient.findAll({ where: { userID: req.user.id } }).then((ingredients) => {
    const ingredientNames = ingredients.map(currIngredient => currIngredient.Name).join();
    instance.get('/recipes/findByIngredients', {
      params: {
        fillIngredients: 'true',
        ingredients: ingredientNames,
        number: '10',
        ranking: '2',
      },
    })
      .then((response) => {
        res.json({
          recipes: response.data,
        });
      })
      .catch((error1) => {
        // console.log(error);
        res.json({ msg: 'Error in calling API' });
      });
  }).catch((error) => {
    res.json({
      msg: 'Error!',
      err: error,
    });
  });
};

module.exports.recipeDetail = function recipeDetailExport(req, res) {
  const recipeId = req.query.recipeId;
  instance.get(`/recipes/${recipeId}/information`)
    .then((response) => {
      res.json({ res: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.json({ msg: 'Error in calling API' });
    });
};
