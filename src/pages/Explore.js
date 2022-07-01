import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import './Explore.css';

function Explore() {
  const history = useHistory();
  const goToExpFoods = () => {
    history.push('/explore/foods');
  };
  const goToExpDrinks = () => {
    history.push('/explore/drinks');
  };
  return (
    <div>
      <Header />
      <div className="btns-box">
        <Button
          className="explore-btns"
          variant="primary"
          data-testid="explore-foods"
          type="button"
          onClick={ goToExpFoods }
        >
          Explore Foods
        </Button>
        <Button
          className="explore-btns"
          variant="primary"
          data-testid="explore-drinks"
          type="button"
          onClick={ goToExpDrinks }
        >
          Explore Drinks
        </Button>
      </div>
      <BottomMenu />
    </div>
  );
}

export default Explore;
