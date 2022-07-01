import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { getRandomDrink } from '../services/API_REQUEST';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import './Explore.css';

function ExploreDrinks() {
  const history = useHistory();

  const goToByIngredients = () => {
    history.push('/explore/drinks/ingredients');
  };
  const goToRandomRecipe = async () => {
    const response = await getRandomDrink();
    history.push(`/drinks/${response[0].idDrink}`);
  };
  return (
    <div>
      <Header />
      <div className="btns-box">
        <Button
          className="explore-btns"
          variant="primary"
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ goToByIngredients }
        >
          By Ingredient
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
        <BottomMenu />
      </div>
    </div>
  );
}

export default ExploreDrinks;
