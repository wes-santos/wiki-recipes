import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../context/appContext';
import { getFoodsList, getDrinksList } from '../services/dataAPI';

function SearchBar() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [stateRadioFilter, setStateRadioFilter] = useState('');
  const [stateNameFilter, setStateNameFilter] = useState('');

  const { setDrinks, setFoods, isHeaderSearch, setIsHeaderSearch,
  } = useContext(appContext);

  const verifyLength = (arr) => {
    if (arr.length === 1) {
      if (pathname.startsWith('/drinks')) {
        return history.push(`/drinks/${arr[0].idDrink}`);
      }
      return history.push(`/foods/${arr[0].idMeal}`);
    }
  };

  const handleClick = async () => {
    setIsHeaderSearch(!isHeaderSearch);
    if (stateRadioFilter === 'f' && stateNameFilter.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (pathname.startsWith('/foods')) {
      const foodsFiltered = await getFoodsList(stateNameFilter, stateRadioFilter);
      if (foodsFiltered === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        verifyLength(foodsFiltered);
        setFoods(foodsFiltered);
      }
    } else {
      const drinksFiltered = await getDrinksList(stateNameFilter, stateRadioFilter);
      if (drinksFiltered === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      } else {
        verifyLength(drinksFiltered);
        setDrinks(drinksFiltered);
      }
    }
  };

  return (
    <section className="searchbar-wrapper">
      <form
        onSubmit={ (e) => {
          e.preventDefault();
        } }
      >
        <input
          type="text"
          name="search"
          data-testid="search-input"
          placeholder="Pesquisar..."
          className="search-input"
          value={ stateNameFilter }
          onChange={ (e) => setStateNameFilter(e.target.value) }
        />
        <div className="searchbar-inputs">
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="ingredient"
              name="filter"
              data-testid="ingredient-search-radio"
              value="i"
              onChange={ (e) => setStateRadioFilter(e.target.value) }
            />
            Ingredient
          </label>
          <label htmlFor="name" data-testid="name-search-radio">
            <input
              type="radio"
              id="name"
              name="filter"
              value="s"
              onChange={ (e) => setStateRadioFilter(e.target.value) }
            />
            Name
          </label>
          <label htmlFor="first-letter">
            <input
              type="radio"
              id="first-letter"
              name="filter"
              data-testid="first-letter-search-radio"
              value="f"
              onChange={ (e) => setStateRadioFilter(e.target.value) }
            />
            First letter
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          className="search-button"
          onClick={ () => handleClick() }
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchBar;
