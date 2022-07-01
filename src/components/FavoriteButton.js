import React from 'react';
import { getFavoriteRecipes, saveFavoriteRecipes } from '../services/localStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton(parameters) {
  const {
    ID,
    typeRecipe,
    isFavorite,
    setIsFavorite,
    recipe,
  } = parameters;

  // useEffect(() => {
  //   const favItems = getFavoriteRecipes();
  //   if (favItems.length > 0) {
  //     setIsFavorite(true);
  //   }
  // }, [setIsFavorite]);

  const handleFavorite = () => {
    if (isFavorite) {
      const getFavItems = getFavoriteRecipes();
      const haha = getFavItems.filter((item) => item.id !== ID);
      saveFavoriteRecipes(haha);
      setIsFavorite(false);
    } else {
      let formatMeal = {};

      if (typeRecipe === 'drinks') {
        formatMeal = {
          id: ID,
          type: 'drink',
          nationality: '',
          category: recipe[0].strCategory,
          alcoholicOrNot: recipe[0].strAlcoholic,
          name: recipe[0].strDrink,
          image: recipe[0].strDrinkThumb,
        };
      } else {
        formatMeal = {
          id: ID,
          type: 'food',
          nationality: recipe[0].strArea,
          category: recipe[0].strCategory,
          alcoholicOrNot: '',
          name: recipe[0].strMeal,
          image: recipe[0].strMealThumb,
        };
      }

      setIsFavorite(!isFavorite);
      const favoriteItems = getFavoriteRecipes();

      let newFavoritesObject;
      if (favoriteItems !== null) {
        newFavoritesObject = [...favoriteItems, formatMeal];
      } else {
        newFavoritesObject = [formatMeal];
      }
      saveFavoriteRecipes(newFavoritesObject);
    }
  };

  return (
    <button
      type="button"
      onClick={ handleFavorite }
      className="favorite-button"
    >
      <img
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        data-testid="favorite-btn"
        alt={ isFavorite ? 'black heart icon' : 'white heart icon' }
        className="favorite-button-image"
      />
    </button>
  );
}

export default FavoriteButton;
