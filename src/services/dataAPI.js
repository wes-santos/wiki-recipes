const BASE_API_FOODS_I = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const BASE_API_FOODS_S = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const BASE_API_FOODS_F = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const BASE_API_FOODS_A = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const BASE_API_FOODS_N = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

const BASE_API_DRINKS_I = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const BASE_API_DRINKS_S = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const BASE_API_DRINKS_F = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const getFiltredNationalities = async (area) => {
  const response = await fetch(`${BASE_API_FOODS_N}${area}`);
  const { meals } = await response.json();
  return response.ok ? Promise.resolve(meals) : Promise.reject(meals);
};

export const getNationalitiesList = async () => {
  const response = await fetch(BASE_API_FOODS_A);
  const { meals } = await response.json();
  return response.ok ? Promise.resolve(meals) : Promise.reject(meals);
};

export const getFoodsList = async (nameFilter, radioFilter) => {
  let response = [];
  if (radioFilter === 'i') {
    response = await fetch(`${BASE_API_FOODS_I}${nameFilter}`);
  } else if (radioFilter === 's') {
    response = await fetch(`${BASE_API_FOODS_S}${nameFilter}`);
  } else {
    response = await fetch(`${BASE_API_FOODS_F}${nameFilter}`);
  }
  const { meals } = await response.json();

  return response.ok ? Promise.resolve(meals) : Promise.reject(meals);
};

export const getDrinksList = async (nameFilter, radioFilter) => {
  let response = [];
  if (radioFilter === 'i') {
    response = await fetch(`${BASE_API_DRINKS_I}${nameFilter}`);
  } else if (radioFilter === 's') {
    response = await fetch(`${BASE_API_DRINKS_S}${nameFilter}`);
  } else {
    response = await fetch(`${BASE_API_DRINKS_F}${nameFilter}`);
  }
  const { drinks } = await response.json();

  return response.ok ? Promise.resolve(drinks) : Promise.reject(drinks);
};
