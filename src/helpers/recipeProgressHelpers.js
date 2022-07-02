import { getDoneRecipes, saveDoneRecipes } from '../services/localStorage';

// Créditos ao Stack Overflow:
// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
const getCurrentDate = () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  today = `${dd}/${mm}/${yyyy}`;
  return today;
};

const doneRecipeObject = (recipe, typeRecipe) => {
  const localStorageRecipes = getDoneRecipes();
  if (recipe) {
    if (typeRecipe === 'foods') {
      const {
        idMeal,
        strArea,
        strCategory,
        strMeal,
        strMealThumb,
        strTags,
      } = recipe[0];
      const foodDoneRecipeObject = [...localStorageRecipes, {
        id: idMeal,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: getCurrentDate(),
        tags: strTags,
      }];
      return foodDoneRecipeObject;
    }
    const {
      idDrink,
      strCategory,
      strAlcoholic,
      strDrink,
      strDrinkThumb,
      strTags,
    } = recipe[0];
    const drinkRecipeDoneObject = [...localStorageRecipes, {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: getCurrentDate(),
      tags: strTags,
    }];
    return drinkRecipeDoneObject;
  }
};

const finishRecipe = (history, recipe, typeRecipe) => {
  saveDoneRecipes(doneRecipeObject(recipe, typeRecipe));
  localStorage.removeItem('inProgressRecipes');
  history.push('/done-recipes');
};

export default finishRecipe;
