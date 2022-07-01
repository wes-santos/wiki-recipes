export const mealsRequestById = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return error;
  }
};

export const drinksRequestById = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    return error;
  }
};

export const searchMealsRequest = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return error;
  }
};

export const searchDrinksRequest = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    return error;
  }
};

export const getRandomFood = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return error;
  }
};

export const getRandomDrink = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    return error;
  }
};

export const foodsIngredients = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    return error;
  }
};

export const drinksIngredients = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    return error;
  }
};
