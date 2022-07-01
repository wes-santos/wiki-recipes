import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

const AMOUNT_BUTTONS = 6;
const DONE_DATE = '23/06/2020';
const FOOD_NAME = 'Spicy Arrabiata Penne';
const DRINK_NAME = 'Aquamarine';

const recipe = [{
  id: '52771',
  type: 'food',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: FOOD_NAME,
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: DONE_DATE,
  tags: ['Pasta', 'Curry'],
},
{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: DRINK_NAME,
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  doneDate: DONE_DATE,
  tags: [],
}];

localStorage.setItem('doneRecipes', JSON.stringify(recipe));

describe('Verifica se', () => {
  beforeEach(() => {
    global.fetch = fetch;
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
  });

  test('Os elementos da tela estão presentes', async () => {
    const headingEl = await screen
      .findByRole('heading', { name: 'Done Recipes' });
    const buttonsEl = await screen.findAllByRole('button');
    const imgEl = await screen.findAllByRole('img');
    const shareButtons = imgEl.filter((e) => e.src.includes('shareIcon.svg'));
    const dateEls = await screen.findAllByText(DONE_DATE);
    const foodName = await screen.findByText(FOOD_NAME);
    const drinkName = await screen.findByText(DRINK_NAME);
    const firstTagEl = await screen.findByText('Pasta');
    const secondTagEl = await screen.findByText('Curry');

    expect(headingEl).toBeInTheDocument();
    expect(buttonsEl.length).toEqual(AMOUNT_BUTTONS);
    expect(buttonsEl[1].innerHTML).toBe('All');
    expect(buttonsEl[2].innerHTML).toBe('Food');
    expect(buttonsEl[3].innerHTML).toBe('Drinks');
    expect(imgEl[0]).toBeInTheDocument();
    expect(imgEl[1]).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(imgEl[3]).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(shareButtons.length).toEqual(2);
    expect(dateEls.length).toEqual(2);
    expect(foodName).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
    expect(firstTagEl).toBeInTheDocument();
    expect(secondTagEl).toBeInTheDocument();
  });

  test('É possível filtrar por comidas', async () => {
    const buttonEl = await screen.findByText('Food');
    const drinkName = await screen.findByText(DRINK_NAME);
    expect(drinkName).toBeInTheDocument();
    userEvent.click(buttonEl);
    const foodName = await screen.findByText(FOOD_NAME);
    expect(drinkName).not.toBeInTheDocument();
    expect(foodName).toBeInTheDocument();
  });

  test('É possível filtrar por bebidas', async () => {
    const buttonEl = await screen.findByText('Drinks');
    const foodName = await screen.findByText(FOOD_NAME);
    expect(foodName).toBeInTheDocument();
    userEvent.click(buttonEl);
    const drinkName = await screen.findByText(DRINK_NAME);
    expect(foodName).not.toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
  });

  test('É possível remover filtros', () => {
    const buttonEl = screen.getByText('Drinks');
    let foodName = screen.getByText(FOOD_NAME);
    expect(foodName).toBeInTheDocument();
    userEvent.click(buttonEl);
    let drinkName = screen.getByText(DRINK_NAME);
    foodName = screen.queryByText(FOOD_NAME);
    expect(foodName).not.toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();

    const allButtonEl = screen.getByText('All');
    userEvent.click(allButtonEl);
    foodName = screen.getByText(FOOD_NAME);
    drinkName = screen.getByText(DRINK_NAME);
    expect(foodName).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
  });

  test('É possível ir para página de detalhes ao clicar na foto de uma comida',
    async () => {
      const imgsEls = await screen.findAllByRole('img');
      userEvent.click(imgsEls[1]);
      const headingEl = await screen.findByRole(
        'heading', { name: 'Recommended', level: 3 },
      );
      const foodTitleEl = await screen.findByRole('heading', { name: FOOD_NAME });
      expect(headingEl).toBeInTheDocument();
      expect(foodTitleEl).toBeInTheDocument();
    });
  test('É possível ir para a página de detalhes ao clicar no nome de uma comida',
    async () => {
      const recipesEls = screen.getByText(FOOD_NAME);
      userEvent.click(recipesEls);
      const headingEl = await screen.findByRole(
        'heading', { name: 'Recommended', level: 3 },
      );
      const foodTitleEl = await screen.findByRole('heading', { name: FOOD_NAME });
      expect(headingEl).toBeInTheDocument();
      expect(foodTitleEl).toBeInTheDocument();
    });

  test('É possível ir para página de detalhes ao clicar na foto de uma bebida',
    async () => {
      const imgsEls = await screen.findAllByRole('img');
      userEvent.click(imgsEls[3]);
      const headingEl = await screen.findByRole(
        'heading', { name: 'Recommended', level: 3 },
      );
      const drinkTitleEl = await screen.findByRole('heading', { name: DRINK_NAME });
      expect(headingEl).toBeInTheDocument();
      expect(drinkTitleEl).toBeInTheDocument();
    });
  test('É possível ir para a página de detalhes ao clicar no nome de uma bebida',
    async () => {
      const drinkName = await screen.findByText(DRINK_NAME);
      userEvent.click(drinkName);
      const headingEl = await screen.findByRole(
        'heading', { name: 'Recommended', level: 3 },
      );
      const drinkTitleEl = await screen.findByRole('heading', { name: DRINK_NAME });
      expect(headingEl).toBeInTheDocument();
      expect(drinkTitleEl).toBeInTheDocument();
    });
});
