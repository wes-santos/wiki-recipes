import React from 'react';
import { getFavoriteRecipes, saveFavoriteRecipes } from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavRecipesButton(parameters) {
  const {
    id,
    index,
    setRecipes,
  } = parameters;

  const handleFavorite = () => {
    const getFavItems = getFavoriteRecipes();
    const haha = getFavItems.filter((item) => item.id !== id);
    saveFavoriteRecipes(haha);
    setRecipes(haha);
  };

  return (
    <button
      type="button"
      onClick={ handleFavorite }
      className="share-button-favorite-recipes"
    >
      <img
        src={ blackHeartIcon }
        data-testid={ `${index}-horizontal-favorite-btn` }
        alt="black heart icon"
      />
    </button>
  );
}

export default FavRecipesButton;
