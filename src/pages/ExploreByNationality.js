import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import Loader from '../components/Loader';
import appContext from '../context/appContext';
import { getFiltredNationalities, getNationalitiesList } from '../services/dataAPI';
import './recipes.css';
import './nationality.css';

function ExploreByNationality() {
  const { foods, setFoods } = useContext(appContext);
  const [nationalities, setNationalities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  const FOODS_PER_PAGE = 12;

  useEffect(() => {
    async function fetchNationalities() {
      const response = await getNationalitiesList();
      setLoading(false);
      setNationalities(response);
    }
    async function fetchFoods() {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const json = await response.json();
      setLoading(false);
      setFoods(json.meals);
    }
    fetchNationalities();
    fetchFoods();
  }, [setFoods]);

  const handleChanges = async (value) => {
    if (value === 'All') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const json = await response.json();
      return setFoods(json.meals);
    }
    const response = await getFiltredNationalities(value);
    setFoods(response);
  };

  return (
    <section>
      <Header />
      { isLoading ? Loader() : (
        <div>
          <section className="areas">
            <select
              data-testid="explore-by-nationality-dropdown"
              name="column"
              value={ nationalities.strArea }
              onChange={ ({ target }) => handleChanges(target.value) }
            >
              <option value="All" data-testid="All-option">All</option>
              { nationalities.map((area) => (
                <option
                  key={ area.strArea }
                  data-testid={ `${area.strArea}-option` }
                  value={ area.strArea }
                >
                  { area.strArea }
                </option>))}
            </select>
          </section>
          <section className="food-cards">
            { foods.map((e, i) => (
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
            ))}
          </section>
        </div>
      ) }
      <BottomMenu />
    </section>
  );
}

export default ExploreByNationality;
