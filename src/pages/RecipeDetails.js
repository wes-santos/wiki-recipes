import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { mealsRequestById, drinksRequestById,
  searchMealsRequest, searchDrinksRequest } from '../services/API_REQUEST';
// import { saveFavoriteRecipes, getFavoriteRecipes } from '../services/localStorage';
import './RecipeDetails.css';
import checkRecipeStatus from '../helpers/detailsFunctions';
import ShareButton from '../components/ShareButton';
import Ingredients from '../components/Ingredients';
import Recommended from '../components/Recommended';
import FavoriteButton from '../components/FavoriteButton';
import ReturnButton from '../components/ReturnButton';
import Loader from '../components/Loader';
import { nanoid } from 'nanoid';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const typeRecipe = pathname.split('/')[1];
  const ID = pathname.split('/')[2];
  const UNTIL_SIXTH_ELEM = 6;

  const [recipe, setRecipe] = useState([]);
  const [recipeStatus, setRecipeStatus] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const parameters = {
    ID,
    typeRecipe,
    isFavorite,
    setIsFavorite,
    recipe,
  };

  useEffect(() => {
    const saveObj = async () => {
      if (typeRecipe === 'foods') {
        const mealObj = await mealsRequestById(ID);
        const drinksObject = await searchDrinksRequest();
        setLoading(false);
        setRecipe(mealObj);
        setDrinks(drinksObject);
      } else {
        const drinkObj = await drinksRequestById(ID);
        const mealsObject = await searchMealsRequest();
        setLoading(false);
        setRecipe(drinkObj);
        setMeals(mealsObject);
      }
    };
    saveObj();
  }, [ID, typeRecipe]);

  useEffect(() => {
    checkRecipeStatus(ID, setRecipeStatus, setIsFavorite, typeRecipe);
  }, [ID, typeRecipe]);

  // --------------------------------------------------------------------------------- FUNÇÃO DE EXIBIR OS BOTÕES DE ÍCONES
  const displayIconButtons = () => (
    <div className="recipe-icons">
      { ReturnButton() }
      { ShareButton(pathname) }
      { FavoriteButton(parameters) }
    </div>
  );

  // --------------------------------------------------------------------------------- FUNÇÃO DE EXIBIR AS COMIDAS
  const displayFoodRecipe = () => (
    recipe[0] && (
      <>
        <div>
          <img
            src={ recipe[0].strMealThumb }
            alt={ `Imagem da receita ${recipe[0].strMeal}` }
            data-testid="recipe-photo"
          />
        </div>
        <div className="main-recipe-infos">
          <h2 data-testid="recipe-title" className="recipe-title">
            { recipe[0].strMeal }
          </h2>
          { displayIconButtons() }
        </div>
        <h4 data-testid="recipe-category" className="category-title">
          { recipe[0].strCategory }
        </h4>

        { recipe.length && Ingredients(typeRecipe, recipe) }

        <section className="instructions">
          <h3 className="instructions-title">Instruções</h3>
          <div data-testid="instructions" className="recipe-details-text">
            {recipe.length && recipe[0].strInstructions.split('.').map((e) => (
              <p key={ nanoid() }>
                {e !== '' && `${e}.`}
              </p>
            ))}
          </div>
        </section>

        { recipe[0].strYoutube
      && (
        <ReactPlayer
          url={ recipe[0].strYoutube }
          data-testid="video"
          width="100%"
          height="200px"
        />
      )}
        { Recommended(drinks, UNTIL_SIXTH_ELEM) }
      </>
    )
  );
  // --------------------------------------------------------------------------------- FUNÇÃO DE EXIBIR AS BEBIDAS
  const displayDrinkRecipe = () => (
    recipe[0] && (
      <>
        <div>
          <img
            src={ recipe[0].strDrinkThumb }
            alt={ `Imagem da receita ${recipe[0].strDrink}` }
            data-testid="recipe-photo"
          />
        </div>
        <div className="main-recipe-infos">
          <h2 data-testid="recipe-title" className="recipe-title">
            { recipe[0].strDrink }
          </h2>
          { displayIconButtons() }
        </div>
        <h4 data-testid="recipe-category" className="category-title">
          { recipe[0].strAlcoholic }
        </h4>

        { recipe.length && Ingredients(typeRecipe, recipe) }

        <section className="instructions">
          <h3 className="instructions-title">Instruções</h3>
          <p data-testid="instructions" className="recipe-details-text">
            {recipe[0].strInstructions}
          </p>
        </section>

        { Recommended(meals, UNTIL_SIXTH_ELEM) }
      </>
    ));

  return (
    <div>
      { isLoading ? Loader() : (
        <div>
          { typeRecipe === 'foods' ? displayFoodRecipe() : displayDrinkRecipe() }

          { recipeStatus !== 'Done' && (
            <div>
              <Button
                type="button"
                variant="primary"
                className="bottom-button"
                data-testid="start-recipe-btn"
                onClick={ () => history.push(`/${typeRecipe}/${ID}/in-progress`) }
              >
                { recipeStatus }
              </Button>
            </div>
          )}
        </div>
      ) }
    </div>
  );
}

export default RecipeDetails;
