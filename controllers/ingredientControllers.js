/* eslint-disable prefer-destructuring */
const axios = require('axios');
const dotenv = require('dotenv').load();
const querystring = require('querystring');
const models = require('../models');

const API_KEY = process.env.API_KEY;
const instance = axios.create({
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/',
  headers: {
    'X-Mashape-Key': API_KEY,
    'Access-Control-Allow-Origin': '*',
    'cache-control': 'no-cache',
    Connection: 'keep-alive',
  },
});
const { Ingredient } = models;

module.exports.addIngredientsFromRecipe = function addIngredientsFromRecipeExport(req, res) {
  console.log(req.body);
  const ingredients = req.body.ingredients;
  ingredients.map((currentIngredient) => {
    console.log(currentIngredient.ID);
    Ingredient.create({
      userID: req.user.id,
      ID: currentIngredient.ID,
      Name: currentIngredient.Name,
      Type: currentIngredient.Type,
      ImgURL: currentIngredient.ImgURL,
    }).then((ingredient) => {
      console.log(`${ingredient.Name} added!`);
    }).catch((error) => {
      console.log(`error adding ${currentIngredient.Name}\n${error}`);
    });
  });
  res.json({
    msg: 'successfully added the ingredients!',
  });
};

module.exports.addIngredientsFromFridge = function addIngredientsFromFridgeExport(req, res) {
  const ingredientString = req.body.ingredientString;
  instance.post('/recipes/parseIngredients', querystring.stringify({
    ingredientList: ingredientString,
    servings: '1',
  })).then((response) => {
    console.log(response.data[0].id);
    Ingredient.create({
      userID: req.user.id,
      ID: response.data[0].id,
      Name: response.data[0].name,
      Type: response.data[0].aisle,
      ImgURL: `https://spoonacular.com/cdn/ingredients_100x100/${response.data[0].image}`,
    }).then((ingredient) => {
      res.json({
        status: 'success',
        ingredient,
      });
    }).catch((error) => {
      res.json({
        status: 'error',
        error,
      });
    });
  }).catch((error) => {
    console.log(`Error fetching ingredient \n${error}`);
    res.json({
      status: 'failure',
    });
  });
};

module.exports.getIngredients = function getIngredientsExport(req, res) {
  Ingredient.findAll({ where: { userID: req.user.id } }).then((ingredients) => {
    res.json({
      ingredients,
    });
  }).catch((error) => {
    res.json({
      msg: 'Error!',
      err: error,
    });
  });
};

module.exports.deleteIngredients = function deleteIngredientsExport(req, res) {
  console.log(req.query.ingredients);
  const ingredientIds = req.query.ingredients;
  Ingredient.destroy({
    where: {
      userID: req.user.id,
      ID: ingredientIds,
    },
  }).then(() => {
    console.log('Successfully deleted items');
    res.json({
      msg: 'successfully deleted items',
    });
  }).catch((error) => {
    console.log('Error deleting items');
    res.json({
      msg: 'Error deleting items',
      err: error,
    });
  });
};
