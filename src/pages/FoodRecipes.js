import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import appContext from '../context/appContext';
import './recipes.css';
import Loader from '../components/Loader';
import { nanoid } from 'nanoid';

function FoodRecipes() {
  const {
    foods,
    setFoods,
    categories,
    setCategories,
    isHeaderSearch,
  } = useContext(appContext);

  const categoriesObject = {
    Beef: false,
    Breakfast: false,
    Chicken: false,
    Dessert: false,
    Goat: false,
  };

  const [currentFoodCategory, setCurrentFoodCategory] = useState('');
  const [isCategoryClicked, setCategoryToClicked] = useState(categoriesObject);
  const [isLoading, setLoading] = useState(true);
  const FOODS_PER_PAGE = 12;
  const CATEGORIES_TO_SHOW = 5;
  const history = useHistory();

  useEffect(() => {
    async function fetchFoods() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const json = await response.json();
      setLoading(false);
      setFoods(json.meals);
    }
    async function fetchCategories() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const json = await response.json();
      setLoading(false);
      setCategories(json.meals);
    }
    if (foods.length === 0) {
      fetchFoods();
    }
    fetchCategories();
  }, [setFoods, setCategories]);

  const toggleCategoryStatus = (category) => (
    setCategoryToClicked((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }))
  );

  const checkClick = (buttonName) => {
    switch (buttonName) {
    case 'Beef':
      return toggleCategoryStatus('Beef');
    case 'Breakfast':
      return toggleCategoryStatus('Breakfast');
    case 'Chicken':
      return toggleCategoryStatus('Chicken');
    case 'Dessert':
      return toggleCategoryStatus('Dessert');
    case 'Goat':
      return toggleCategoryStatus('Goat');
    default: return false;
    }
  };

  const handleClick = async ({ target: { name } }) => {
    checkClick(name);
    if (isCategoryClicked[name]) {
      return setCurrentFoodCategory('');
    }
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
    const json = await response.json();
    setCurrentFoodCategory(json.meals);
  };

  const displayFoods = (arrFoods) => (
    arrFoods.map((e, i) => (
      i < FOODS_PER_PAGE && (
        <div key={ e.idMeal } data-testid={ `${i}-recipe-card` }>
          <button
            type="button"
            onClick={ () => history.push(`/foods/${e.idMeal}`) }
          >
            <img
              src={ e.strMealThumb }
              alt={ e.strMeal }
              data-testid={ `${i}-card-img` }
            />
          </button>
          <p data-testid={ `${i}-card-name` }>{ e.strMeal }</p>
        </div>
      )
    )));

  return (
    <section>
      <Header />
      { isLoading ? Loader() : (
        <section className="categories">
          { !!isHeaderSearch && (
            <Button
              type="button"
              data-testid="All-category-filter"
              className="category"
              onClick={ () => setCurrentFoodCategory('') }
              variant="outline-primary"
            >
              All
            </Button>
          )}
          { !!isHeaderSearch && categories.map((e, i) => (
            i < CATEGORIES_TO_SHOW && (
              <Button
                type="button"
                data-testid={ `${e.strCategory}-category-filter` }
                key={ nanoid() }
                className="category"
                name={ e.strCategory }
                onClick={ handleClick }
                variant="outline-primary"
              >
                {e.strCategory}
              </Button>
            )
          ))}
          <section className="food-cards">
            {currentFoodCategory
              ? displayFoods(currentFoodCategory)
              : displayFoods(foods)}
          </section>
        </section>

      )}
      <BottomMenu />
    </section>
  );
}

export default FoodRecipes;
