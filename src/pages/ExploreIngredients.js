import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { foodsIngredients, drinksIngredients } from '../services/API_REQUEST';
import './ExploreIngredients.css';
import appContext from '../context/appContext';
import { getFoodsList, getDrinksList } from '../services/dataAPI';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import Loader from '../components/Loader';
import { nanoid } from 'nanoid';

function ExploreByIngredients() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const type = pathname.split('/')[2];
  const SHOW_TWELVE_ITEMS = 12;

  const [foodsIng, setFoodsIng] = useState([]);
  const [drinksIng, setDrinksIng] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { setDrinks, setFoods } = useContext(appContext);

  useEffect(() => {
    const saveIngredients = async () => {
      if (type === 'foods') {
        const foodsObj = await foodsIngredients();
        setLoading(false);
        setFoodsIng(foodsObj);
      } else {
        const drinksObj = await drinksIngredients();
        setLoading(false);
        setDrinksIng(drinksObj);
      }
    };
    saveIngredients();
  });

  const handleClick = async ({ target: { name } }) => {
    if (type === 'foods') {
      const foodsResponse = await getFoodsList(name, 'i');
      await setFoods(foodsResponse);
      history.push('/foods');
    } else {
      const drinksResponse = await getDrinksList(name, 'i');
      await setDrinks(drinksResponse);
      history.push('/drinks');
    }
  };

  const displayFoodsIng = () => (
    foodsIng && (
      <div className="ingredients-container">
        {(foodsIng.slice(0, SHOW_TWELVE_ITEMS).map((item, index) => (
          <div
            key={ nanoid() }
            data-testid={ `${index}-ingredient-card` }
            className="ingredients-cards"
          >
            <button
              type="button"
              onClick={ handleClick }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                alt={ `Imagem da receita ${item.strIngredient}` }
                data-testid={ `${index}-card-img` }
                name={ item.strIngredient }
              />
            </button>
            <h5 className="ingredient-name" data-testid={ `${index}-card-name` }>
              { item.strIngredient }
            </h5>
          </div>
        )))}
      </div>
    )
  );

  const displayDrinksIng = () => (
    drinksIng && (
      <div className="ingredients-container">
        {(drinksIng.slice(0, SHOW_TWELVE_ITEMS).map((item, index) => (
          <div
            key={ nanoid() }
            data-testid={ `${index}-ingredient-card` }
            className="ingredients-cards"
          >
            <button
              type="button"
              onClick={ handleClick }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
                alt={ `Imagem da receita ${item.strIngredient1}` }
                data-testid={ `${index}-card-img` }
                name={ item.strIngredient1 }
              />
            </button>
            <h5 data-testid={ `${index}-card-name` }>
              { item.strIngredient1 }
            </h5>
          </div>
        )))}
      </div>
    )
  );

  return (
    <>
      <Header />
      { isLoading ? Loader() : (
        <div>
          { type === 'foods' ? displayFoodsIng() : displayDrinksIng() }
        </div>
      )}
      <BottomMenu />
    </>
  );
}

export default ExploreByIngredients;
