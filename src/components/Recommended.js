import React from 'react';
import { Carousel } from 'react-bootstrap';

function Recommended(drinksOrMeals, magicNumber) {
  const array = drinksOrMeals;
  return (
    <div className="recommended-wrapper">
      <h3>Recommended</h3>
      <Carousel>
        {(array.slice(0, magicNumber).map((item, index) => (
          <Carousel.Item
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            // className="drink-cards"
          >
            <img
              className="d-block w-100"
              src={ item.strDrinkThumb || item.strMealThumb }
              alt={ `Imagem da receita ${item.strDrink || item.strMeal}` }
            />
            <Carousel.Caption>
              <h6>{ item.strAlcoholic || item.strCategory }</h6>
              <h5 data-testid={ `${index}-recomendation-title` }>
                { item.strDrink || item.strMeal }
              </h5>
            </Carousel.Caption>
          </Carousel.Item>
        )))}
      </Carousel>
    </div>
  );
}

export default Recommended;
