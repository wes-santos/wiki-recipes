import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getInProgressRecipes,
  saveInProgressRecipes,
  getFavoriteRecipes } from '../services/localStorage';
import './RecipeProgress.css';
import { mealsRequestById, drinksRequestById } from '../services/API_REQUEST';
import FavoriteButton from '../components/FavoriteButton';
import shareIcon from '../images/shareIcon.svg';
import { nanoid } from 'nanoid';
import ReturnButton from '../components/ReturnButton';
import finishRecipe from '../helpers/recipeProgressHelpers';
import Loader from '../components/Loader';

function RecipeProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [recipeThumb, setRecipeThumb] = useState();
  const typeRecipe = pathname.split('/')[1];
  const [recipeTitle, setRecipeTitle] = useState();
  const [categoryText, setCategoryText] = useState('');
  const [ingredientsList, setingredientsList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const ID = pathname.split('/')[2];

  useEffect(() => {
    if (getFavoriteRecipes().length > 0) { setIsFavorite(true); }
  }, []);
  const initialLinedValues = {};
  ingredientsList.forEach((item) => { initialLinedValues[item] = false; });
  const [linedIngredients, setLinedIngredients] = useState(initialLinedValues);
  const justNumbers = (string) => parseInt(string.replace(/[^0-9]/g, ''), 10);

  const createIngredientList = (mealObj) => {
    const response = getInProgressRecipes();
    const currentChecks = response && Object
      .values(response[typeRecipe === 'foods' ? 'meals' : 'cocktails']);
    const ingredientsObjKeys = Object.keys(mealObj[0]);
    const ingredientsObjValues = Object.values(mealObj[0]);
    const newIngredientsObj = [];
    for (let i = 0; i < ingredientsObjKeys.length; i += 1) {
      if (ingredientsObjKeys[i].includes('strIngredient') && ingredientsObjValues[i]) {
        const IngreId = justNumbers(ingredientsObjKeys[i]);
        newIngredientsObj
          .push({
            name: ingredientsObjValues[i],
            id: IngreId,
            isChecked: currentChecks && currentChecks
              .some((item, index) => item[index] === IngreId) });
      }
    }setingredientsList(newIngredientsObj);
  };

  useEffect(() => {
    const recipeObj = async () => {
      if (typeRecipe === 'foods') {
        const mealObj = await mealsRequestById(ID);
        setRecipe(mealObj);
        setLoading(false);
        setRecipeTitle(mealObj[0].strMeal);
        setRecipeThumb(mealObj[0].strMealThumb);
        setCategoryText(mealObj[0].strCategory);
        createIngredientList(mealObj);
      } else {
        const drinkObj = await drinksRequestById(ID);
        setRecipe(drinkObj);
        setLoading(false);
        setCategoryText(drinkObj[0].strCategory);
        setRecipeThumb(drinkObj[0].strDrinkThumb);
        setRecipeTitle(drinkObj[0].strDrink);
        createIngredientList(drinkObj);
        ingredientsList.forEach((item) => {
          initialLinedValues[item] = false;
        });
      }
    };
    recipeObj();
  }, [ID, typeRecipe]);

  const setFoodRecipeProgress = (ingredientName, labelEl) => {
    const mealId = recipe[0].idMeal;
    const firstPos = 7;
    const lastPos = 27;
    const recipeCopy = recipe.slice();
    const ingredientsObjKeys = Object.keys(recipeCopy[0]).slice(firstPos, lastPos);
    const ingredientsObjValues = Object.values(recipeCopy[0]).slice(firstPos, lastPos);
    let ingredientId;
    for (let i = 0; i < ingredientsObjKeys.length; i += 1) {
      if (ingredientsObjValues[i] === ingredientName) {
        ingredientId = justNumbers(ingredientsObjKeys[i]);
      }
    }
    const prevValueLocal = getInProgressRecipes();
    if (!prevValueLocal) {
      const INITIAL_STATE = { meals: { [mealId]: [ingredientId] }, cocktails: {} };
      saveInProgressRecipes(INITIAL_STATE);
    } else {
      const removedMealIdKey = JSON.parse(JSON.stringify(prevValueLocal));
      delete removedMealIdKey.meals[mealId];
      if (prevValueLocal.meals[mealId].includes(ingredientId)) labelEl.className = '';
      const newValueForLocalStorage = {
        meals: { [mealId]: (prevValueLocal.meals[mealId].includes(ingredientId)
          ? prevValueLocal.meals[mealId]
            .filter((id) => Number(id) !== Number(ingredientId))
          : [...prevValueLocal.meals[mealId], ingredientId]
        ),
        ...removedMealIdKey.meals },
        cocktails: prevValueLocal.cocktails };
      saveInProgressRecipes(newValueForLocalStorage);
    }
  };

  const setDrinkRecipeProgress = (ingredientName, labelEl) => {
    const drinkId = recipe[0].idDrink;
    const recipeCopy = recipe.slice();
    const ingredientsObjKeys = Object.keys(recipeCopy[0]);/* .slice(firstPos, lastPos); */
    const ingredientsObjValues = Object.values(recipeCopy[0]);/* .slice(firstPos, lastPos); */
    let ingredientId;
    for (let i = 0; i < ingredientsObjKeys.length; i += 1) {
      if (ingredientsObjKeys[i].includes('strIngredient')
        && ingredientsObjValues[i] === ingredientName) {
        ingredientId = justNumbers(ingredientsObjKeys[i]);
      }
    }
    const prevValueLocal = getInProgressRecipes();
    if (!prevValueLocal) {
      const INITIAL_STATE = { meals: {}, cocktails: { [drinkId]: [ingredientId] } };
      saveInProgressRecipes(INITIAL_STATE);
    } else {
      const removedMealIdKey = JSON.parse(JSON.stringify(prevValueLocal));
      delete removedMealIdKey.cocktails[drinkId];
      if (prevValueLocal.cocktails[drinkId].includes(ingredientId)) {
        labelEl.className = '';
      }
      const newValueForLocalStorage = {
        cocktails: { [drinkId]: (prevValueLocal.cocktails[drinkId].includes(ingredientId)
          ? prevValueLocal.cocktails[drinkId]
            .filter((id) => Number(id) !== Number(ingredientId))
          : [...prevValueLocal.cocktails[drinkId], ingredientId]
        ),
        ...removedMealIdKey.cocktails },
        meals: prevValueLocal.meals };
      saveInProgressRecipes(newValueForLocalStorage);
    }
  };

  const setProgressToLocalStorage = (ingredientName, labelEl) => {
    if (typeRecipe === 'foods') setFoodRecipeProgress(ingredientName, labelEl);
    else setDrinkRecipeProgress(ingredientName, labelEl);
  };

  const lineIgredient = ({ target }) => {
    const labelEl = target.parentElement;
    labelEl.className = 'lined';
    const ingredientName = labelEl.innerText;
    setProgressToLocalStorage(ingredientName, labelEl);
    const teste = ingredientsList.reduce((acc, curr, index) => {
      if (curr.id === Number(target.id)) {
        curr.isChecked = !curr.isChecked;
        acc[index] = curr;
        return acc;
      }
      return [...acc, curr];
    }, []);
    setingredientsList(teste);
    setLinedIngredients((prev) => ({ ...prev,
      [ingredientName]: !linedIngredients[ingredientName],
    }));
  };

  const isAllChecked = () => ingredientsList.every((e) => e.isChecked === true);

  const copyLinkOnClick = ({ target }) => {
    const path = pathname.split('/').splice(1, 2).join('/');
    copy(`http://localhost:3000/${path}`);
    target.innerHTML = 'Link copied!';
  };

  const params = { ID, typeRecipe, isFavorite, setIsFavorite, recipe };

  const renderPage = () => (isLoading ? Loader() : (
    <div>
      <img src={ recipeThumb } alt="recipePhoto" data-testid="recipe-photo" />
      <div className="main-recipe-infos">
        <h2 data-testid="recipe-title" className="recipe-title">{recipeTitle}</h2>
        <div className="recipe-icons">
          {ReturnButton()}
          <button
            type="button"
            data-testid="share-btn"
            onClick={ copyLinkOnClick }
          >
            <img src={ shareIcon } alt="share-button" />
          </button>
          {FavoriteButton(params)}
        </div>
      </div>
      <span data-testid="recipe-category" className="category-title">
        {categoryText}
      </span>
      <div className="ingredients-list">
        <h3>Ingredients</h3>
        {ingredientsList.map(({ name, isChecked }, index) => (
          <label
            data-testid={ `${index}-ingredient-step` }
            key={ nanoid() }
            htmlFor={ index + 1 }
            className={ isChecked ? 'lined' : null }
          >
            <input
              id={ index + 1 }
              key={ nanoid() }
              type="checkbox"
              onChange={ lineIgredient }
              checked={ isChecked }
            />
            {name}
          </label>
        ))}
      </div>
      <h3 className="instructions-title">Instruções</h3>
      <div data-testid="instructions" className="recipe-progress-text">
        {recipe.length && recipe[0].strInstructions.split('.').map((e) => (
          <p key={ nanoid() }>
            {e !== '' && `${e}.`}
          </p>
        ))}
      </div>
      <Button
        data-testid="finish-recipe-btn"
        type="button"
        variant="primary"
        onClick={ () => finishRecipe(history, recipe, typeRecipe) }
        disabled={ !isAllChecked() }
      >
        Finish Recipe
      </Button>
    </div>
  ));

  return renderPage();
}

export default RecipeProgress;
