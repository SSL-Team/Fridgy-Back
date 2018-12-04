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
  console.log(process.env.API_KEY);
  console.log(typeof process.env.API_KEY);
  Ingredient.findAll({ where: { userID: req.user.id } }).then((ingredients) => {
    const ingredientNames = ingredients.map(currIngredient => currIngredient.ingredientName).join();
    // console.log(ingredientNames);
    instance.get('/recipes/findByIngredients', {
      params: {
        fillIngredients: 'true',
        ingredients: ingredientNames,
        number: '10',
        ranking: '2',
      },
    })
      .then((response) => {
        console.log(response.data);
        res.json({
          recipes: response.data,
        });
        // AVAILABLE FOR MORE DETAILED MASS RECIPE INFO
        // const recipeIds = response.data.map(currId => currId.id).join();
        // console.log('RECIPE IDs');
        // console.log(recipeIds);
        // instance.get('/recipes/informationBulk', {
        //   params: {
        //     ids: recipeIds,
        //   },
        // }).then((innerResponse) => {
        //   console.log(innerResponse.data);
        // }).catch((error) => {
        //   console.log(error);
        // });
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
  instance.get(`/recipes/${req.body.recipeID}/information`)
    .then((response) => {
      console.log(response.data);
      res.json({ res: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.json({ msg: 'Error in calling API' });
    });
};
