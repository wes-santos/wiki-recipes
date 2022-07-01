import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import appContext from '../context/appContext';
import './recipes.css';
import Loader from '../components/Loader';

function DrinkRecipes() {
  const {
    drinks,
    setDrinks,
    categories,
    setCategories,
  } = useContext(appContext);

  const categoriesObject = {
    'Ordinary Drink': false,
    Cocktail: false,
    'Milk / Float / Shake': false,
    'Other/Unknown': false,
    Cocoa: false,
  };

  const [currentDrinkCategory, setCurrentDrinkCategory] = useState('');
  const [isCategoryClicked, setCategoryToClicked] = useState(categoriesObject);
  const [isLoading, setLoading] = useState(true);
  const DRINKS_PER_PAGE = 12;
  const CATEGORIES_TO_SHOW = 5;
  const history = useHistory();

  useEffect(() => {
    async function fetchDrinks() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const json = await response.json();
      setLoading(false);
      setDrinks(json.drinks);
    }
    async function fetchCategories() {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const json = await response.json();
      setLoading(false);
      setCategories(json.drinks);
    }
    if (drinks.length === 0) {
      fetchDrinks();
    }
    fetchCategories();
  }, [setDrinks, setCategories]);

  const toggleCategoryStatus = (category) => (
    setCategoryToClicked((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }))
  );

  const checkClick = (buttonName) => {
    switch (buttonName) {
    case 'Ordinary Drink':
      return toggleCategoryStatus('Ordinary Drink');
    case 'Cocktail':
      return toggleCategoryStatus('Cocktail');
    case 'Milk / Float / Shake':
      return toggleCategoryStatus('Milk / Float / Shake');
    case 'Other/Unknown':
      return toggleCategoryStatus('Other/Unknown');
    case 'Cocoa':
      return toggleCategoryStatus('Cocoa');
    default: return false;
    }
  };

  const handleClick = async ({ target: { name } }) => {
    checkClick(name);
    if (isCategoryClicked[name]) {
      return setCurrentDrinkCategory('');
    }
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`);
    const json = await response.json();
    setCurrentDrinkCategory(json.drinks);
  };

  const displayDrinks = (arrDrinks) => (
    arrDrinks.map((e, i) => (
      i < DRINKS_PER_PAGE && (
        <div key={ e.idDrink } data-testid={ `${i}-recipe-card` }>
          <button
            type="button"
            onClick={ () => history.push(`/drinks/${e.idDrink}`) }
          >
            <img
              src={ e.strDrinkThumb }
              alt={ e.strDrink }
              data-testid={ `${i}-card-img` }
            />
          </button>
          <p data-testid={ `${i}-card-name` }>{ e.strDrink }</p>
        </div>
      )
    )));

  return (
    <section>
      <Header />
      { isLoading ? Loader() : (
        <section className="categories">
          <Button
            type="button"
            data-testid="All-category-filter"
            className="category"
            onClick={ () => setCurrentDrinkCategory('') }
            variant="outline-primary"
          >
            All
          </Button>
          {categories.map((e, i) => (
            i < CATEGORIES_TO_SHOW && (
              <Button
                type="button"
                data-testid={ `${e.strCategory}-category-filter` }
                key={ i }
                className="category"
                name={ e.strCategory }
                onClick={ handleClick }
                variant="outline-primary"
              >
                {e.strCategory}
              </Button>
            )
          ))}
          <section className="drink-cards">
            {currentDrinkCategory
              ? displayDrinks(currentDrinkCategory)
              : displayDrinks(drinks)}
          </section>
        </section>
      ) }
      <BottomMenu />
    </section>
  );
}

export default DrinkRecipes;
