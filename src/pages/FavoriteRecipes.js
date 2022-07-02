import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import generateRandomNumbers from '../helpers/generateRandomNumbers';
import { getFavoriteRecipes } from '../services/localStorage';
import FavRecipesButton from '../components/FavRecipesButton';
import { nanoid } from 'nanoid';

function FavoriteRecipes() {
  const favRecipes = getFavoriteRecipes();
  const [recipes, setRecipes] = useState(favRecipes);

  const handleClick = (params) => {
    const recipeType = Object.keys(params)[1];
    const { target } = params;
    if (recipeType === 'food') {
      copy(`http://localhost:3000/foods/${params.food.id}`);
      if (target.innerHTML === '') {
        target.parentElement.innerHTML = 'Link copied!';
      }
      return;
    }
    copy(`http://localhost:3000/drinks/${params.drink.id}`);
    if (target.innerHTML === '') {
      target.parentElement.innerHTML = 'Link copied!';
    }
  };

  const displayFoods = (obj, index) => {
    const objConvertedToArray = [obj];
    return objConvertedToArray.map((food) => (
      <div
        key={ nanoid() }
        className="favorite-recipe-card"
      >
        <Link to={ `/foods/${food.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ food.image }
            alt={ `${food.name}` }
            className="favorite-recipe-image"
          />
        </Link>
        <div className="favorite-recipe-info">
          <div className="favorite-recipe-title">
            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="favorite-recipe-category"
            >
              { `${food.nationality} - ${food.category}` }
            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ (event) => {
                const { target } = event;
                const params = { target, food };
                handleClick(params);
              } }
              className="share-button-favorite-recipes"
            >
              <img
                src={ shareIcon }
                alt="share icon"
              />
            </button>
            {
              FavRecipesButton(
                { id: food.id, index, setRecipes },
              )
            }
          </div>
          <Link to={ `/foods/${food.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
              className="favorite-recipe-name"
            >
              { food.name }
            </p>
          </Link>
          <p
            data-testid={ `${index}-horizontal-done-date` }
            className="done-date"
          >
            Done in: 23/06/2020
          </p>
        </div>
      </div>
    ));
  };

  const displayDrinks = (obj, index) => {
    const objConvertedToArray = [obj];
    return objConvertedToArray.map((drink) => (
      <div
        key={ nanoid() }
        className="favorite-recipe-card"
      >
        <Link to={ `/drinks/${drink.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ drink.image }
            alt={ `${drink.name}` }
            className="favorite-recipe-image"
          />
        </Link>
        <div className="favorite-recipe-info">
          <div className="favorite-recipe-title">
            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="favorite-recipe-category"
            >
              { `${drink.alcoholicOrNot}` }
            </p>
            <button
              type="button"
              onClick={ (event) => {
                const { target } = event;
                const params = { target, drink };
                handleClick(params);
              } }
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              className="share-button-favorite-recipes"
            >
              <img
                src={ shareIcon }
                alt="share icon"
              />
            </button>
            {
              FavRecipesButton(
                { id: drink.id, index, setRecipes },
              )
            }
          </div>
          <Link to={ `/drinks/${drink.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
              className="favorite-recipe-name"
            >
              { drink.name }
            </p>
          </Link>
          <p
            data-testid={ `${index}-horizontal-done-date` }
            className="done-date"
          >
            Done in: 23/06/2020
          </p>
        </div>
      </div>
    ));
  };

  const cleanFilters = () => {
    setRecipes(favRecipes);
  };

  const filterFoods = () => {
    const filteredFoods = favRecipes.filter((e) => e.type === 'food');
    setRecipes(filteredFoods);
  };

  const filterDrinks = () => {
    const filteredDrinks = favRecipes.filter((e) => e.type === 'drink');
    setRecipes(filteredDrinks);
  };

  return (
    <div>
      <Header />
      <section className="categories">
        <Button
          type="button"
          variant="primary"
          className="category"
          data-testid="filter-by-all-btn"
          onClick={ cleanFilters }
        >
          All
        </Button>
        <Button
          type="button"
          variant="primary"
          className="category"
          data-testid="filter-by-food-btn"
          onClick={ filterFoods }
        >
          Food
        </Button>
        <Button
          type="button"
          variant="primary"
          className="category"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrinks }
        >
          Drinks
        </Button>
      </section>
      <section className="favorite-recipes-card">
        { recipes.map((obj, index) => (
          obj.type === 'food' ? displayFoods(obj, index) : displayDrinks(obj, index)
        )) }
      </section>
    </div>
  );
}

export default FavoriteRecipes;
