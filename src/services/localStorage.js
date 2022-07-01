export const getMealsToken = () => localStorage.getItem('mealsToken');

export const getCocktailsToken = () => localStorage.getItem('cocktailsToken');
export const getUserEmail = () => JSON.parse(localStorage.getItem('user'));

export const saveTokens = () => {
  localStorage.setItem('mealsToken', 1);
  localStorage.setItem('cocktailsToken', 1);
};

export const saveEmail = (emailObj) => {
  localStorage.setItem('user', JSON.stringify(emailObj));
};
// DONE RECIPES
export const getDoneRecipes = () => JSON.parse(localStorage.getItem('doneRecipes')) || [];

export const saveDoneRecipes = (recipe) => {
  localStorage.setItem('doneRecipes', JSON.stringify(recipe));
};

// IN PROGRESS RECIPES
export const getInProgressRecipes = () => {
  const getResult = localStorage.getItem('inProgressRecipes');
  return JSON.parse(getResult);
};

export const saveInProgressRecipes = (recipe) => {
  localStorage.setItem('inProgressRecipes', JSON.stringify(recipe));
};

// FAVORITE RECIPES
export const getFavoriteRecipes = () => {
  const getResult = localStorage.getItem('favoriteRecipes');
  return JSON.parse(getResult) || [];
};

export const saveFavoriteRecipes = (recipe) => {
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipe));
};

export const makeLogout = () => localStorage.clear();
