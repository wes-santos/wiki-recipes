import { nanoid } from 'nanoid';
import React from 'react';

function Ingredients(typeRecipe, recipe) {
  const array = recipe;
  const getIngredients = () => {
    const MAX_ING_FOOD = 20;
    const MAX_ING_DRINK = 15;
    const LAST_INGREDIENT = typeRecipe === 'food' ? MAX_ING_FOOD : MAX_ING_DRINK;
    const arr = [];

    for (let index = 1; index <= LAST_INGREDIENT; index += 1) {
      let object = {
        ingredient: '',
        measure: '',
      };
      if (array[0][`strIngredient${index}`] !== ''
      && array[0][`strIngredient${index}`] !== null) {
        object = {
          ingredient: array[0][`strIngredient${index}`],
          measure: array[0][`strMeasure${index}`] !== null
            ? array[0][`strMeasure${index}`] : '',
        };
        arr.push(object);
      }
    }
    return arr;
  };

  return (
    <div className="ingredients-list">
      <h3>Ingredientes</h3>
      <ul>
        { getIngredients().map((item, index) => (
          <li
            key={ nanoid() }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {item.measure !== ''
              ? `${item.ingredient} - ${item.measure}` : item.ingredient}
          </li>
        )) }
      </ul>
    </div>
  );
}

export default Ingredients;
