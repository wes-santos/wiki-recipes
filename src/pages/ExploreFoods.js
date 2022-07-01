import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getRandomFood } from '../services/API_REQUEST';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import './Explore.css';

function ExploreFoods() {
  const history = useHistory();

  const goToByIngredients = () => {
    history.push('/explore/foods/ingredients');
  };
  const goToByNationality = () => {
    history.push('/explore/foods/nationalities');
  };
  const goToRandomRecipe = async () => {
    const response = await getRandomFood();
    history.push(`/foods/${response[0].idMeal}`);
  };
  return (
    <div>
      <Header />
      <div className="btns-box">
        <Button
          className="explore-btns"
          data-testid="explore-by-ingredient"
          type="button"
          variant="primary"
          onClick={ goToByIngredients }
        >
          By Ingredient
        </Button>
        <Button
          className="explore-btns"
          variant="primary"
          data-testid="explore-by-nationality"
          type="button"
          onClick={ goToByNationality }
        >
          By Nationality
        </Button>
        <Button
          className="explore-btns"
          variant="primary"
          data-testid="explore-surprise"
          type="button"
          onClick={ goToRandomRecipe }
        >
          Surprise me!
        </Button>
      </div>
      <BottomMenu />
    </div>
  );
}

export default ExploreFoods;
