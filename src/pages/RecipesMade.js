import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import { getDoneRecipes } from '../services/localStorage';
import './recipesMade.css';
import { nanoid } from 'nanoid';

function RecipesMade() {
  const doneRecipes = getDoneRecipes() || [];
  const [recipes, setRecipes] = useState(doneRecipes);

  const renderTags = (tag, index) => (
    <div
      key={ nanoid() }
      data-testid={ `${index}-${tag}-horizontal-tag` }
      className="recipe-tag"
    >
      {tag}
    </div>
  );

  const displayTags = (obj, index) => (
    <div
      className="tags"
    >
      {
        typeof obj.tags !== 'object' ? obj.tags.split(',')
          .map((tag) => renderTags(tag, index))
          : (obj.tags !== null && obj.tags
            .map((tag) => renderTags(tag, index)))
      }
    </div>
  );

  const handleClick = (params) => {
    const { target, recipe: { type, id } } = params;
    if (type === 'food') {
      copy(`http://localhost:3000/foods/${id}`);
      if (target.innerHTML === '') {
        target.parentElement.innerHTML = 'Link copied!';
      }
      return;
    }
    copy(`http://localhost:3000/drinks/${id}`);
    if (target.innerHTML === '') {
      target.parentElement.innerHTML = 'Link copied!';
    }
  };

  const displayFoods = (obj, index) => {
    const objConvertedToArray = [obj];
    return objConvertedToArray.map((food) => (
      <div
        key={ nanoid() }
        className="done-recipe-card"
      >
        <Link to={ `/foods/${food.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ food.image }
            alt={ `${food.name}` }
            className="recipe-image-done-recipes"
          />
        </Link>
        <div className="done-recipe-info">
          <div className="done-recipe-title">
            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="done-recipe-category"
            >
              { `${food.nationality} - ${food.category}` }
            </p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              onClick={ (event) => {
                const { target } = event;
                const params = { target, recipe: food };
                handleClick(params);
              } }
              className="share-button-done-recipes"
            >
              <img
                src={ shareIcon }
                alt="share icon"
              />
            </button>
          </div>
          <Link to={ `/foods/${food.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
              className="done-recipe-name"
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
          { displayTags(food, index) }
        </div>
      </div>
    ));
  };

  const displayDrinks = (obj, index) => {
    const objConvertedToArray = [obj];
    return objConvertedToArray.map((drink) => (
      <div
        key={ nanoid() }
        className="done-recipe-card"
      >
        <Link to={ `/drinks/${drink.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ drink.image }
            alt={ `${drink.name}` }
            className="recipe-image-done-recipes"
          />
        </Link>
        <div className="done-recipe-info">
          <div className="done-recipe-title">
            <p
              data-testid={ `${index}-horizontal-top-text` }
              className="done-recipe-category"
            >
              { `${drink.alcoholicOrNot}` }
            </p>
            <button
              type="button"
              onClick={ (event) => {
                const { target } = event;
                const params = { target, recipe: drink };
                handleClick(params);
              } }
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              className="share-button-done-recipes"
            >
              <img
                src={ shareIcon }
                alt="share icon"
              />
            </button>
          </div>
          <Link to={ `/drinks/${drink.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
              className="done-recipe-name"
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
          { displayTags(drink, index) }
        </div>
      </div>
    ));
  };

  const cleanFilters = () => {
    setRecipes(doneRecipes);
  };

  const filterFoods = () => {
    const filteredFoods = doneRecipes.filter((e) => e.type === 'food');
    setRecipes(filteredFoods);
  };

  const filterDrinks = () => {
    const filteredDrinks = doneRecipes.filter((e) => e.type === 'drink');
    setRecipes(filteredDrinks);
  };

  return (
    <div>
      <Header />
      <section className="categories">
        <Button
          type="button"
          className="category"
          data-testid="filter-by-all-btn"
          onClick={ cleanFilters }
          variant="outline-primary"
        >
          All
        </Button>
        <Button
          type="button"
          className="category"
          data-testid="filter-by-food-btn"
          onClick={ filterFoods }
          variant="outline-primary"
        >
          Food
        </Button>
        <Button
          type="button"
          className="category"
          data-testid="filter-by-drink-btn"
          onClick={ filterDrinks }
          variant="outline-primary"
        >
          Drinks
        </Button>
      </section>
      <section className="done-recipes-cards">
        { recipes !== [] && recipes.map((obj, index) => (
          obj.type === 'food' ? displayFoods(obj, index) : displayDrinks(obj, index)
        )) }
      </section>
    </div>
  );
}

export default RecipesMade;
