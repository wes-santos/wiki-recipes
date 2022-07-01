import { getDoneRecipes, getInProgressRecipes,
  getFavoriteRecipes } from '../services/localStorage';

// VERIFICA O STATUS DA RECEITA (DONE / IN-PROGRESS) POIS O BOTÃO NO FIM DA PÁGINA DEPENDE DESTA INFORMAÇÃO
const checks = (setRecipeStatus, checkDone, checkInProgress) => {
  if (checkDone) {
    return setRecipeStatus('Done');
  }

  if (checkInProgress) {
    return setRecipeStatus('Continue Recipe');
  }

  setRecipeStatus('Start Recipe');
};

const checkRecipeStatus = (ID, setRecipeStatus, setIsFavorite, typeRecipe) => {
  const doneRecipes = getDoneRecipes();
  const inProgressRecipes = getInProgressRecipes();
  // console.log(inProgressRecipes);
  const favoriteRecipes = getFavoriteRecipes();

  const checkFavorite = favoriteRecipes
    && Object.values(favoriteRecipes).some((item) => item.id === ID);

  if (checkFavorite) {
    setIsFavorite(true);
  }

  const checkDone = doneRecipes
    && Object.values(doneRecipes).some((item) => item.id === ID);
  const checkInProgress = inProgressRecipes
    && Object.keys(inProgressRecipes[typeRecipe === 'foods' ? 'meals' : 'cocktails'])
      .some((item) => item === ID);

  checks(setRecipeStatus, checkDone, checkInProgress);
};

export default checkRecipeStatus;
