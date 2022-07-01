import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './renderWithRouter';

const EXPLORE_INGREDIENTS = 'Explore Ingredients';

describe('Verifica se', () => {
  beforeEach(() => {
    global.fetch = fetch;
  });

  describe('Header contém o texto `Explore Ingredients`', () => {
    test('Em foods', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/explore/foods/ingredients');
      const titleEl = screen.getByRole('heading', { name: EXPLORE_INGREDIENTS });
      expect(titleEl.innerHTML).toBe(EXPLORE_INGREDIENTS);
    });
    test('Em drinks', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/explore/drinks/ingredients');
      const titleEl = screen.getByRole('heading', { name: EXPLORE_INGREDIENTS });
      expect(titleEl.innerHTML).toBe(EXPLORE_INGREDIENTS);
    });
  });

  describe('Ao clicar em um ingrediente, os resultados são filtrados em', () => {
    test('Foods', async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/explore/foods/ingredients');
      const foodCardEl = await screen.findByTestId('0-card-img');
      userEvent.click(foodCardEl);
      const firstFoodEl = await screen.findByText('Brown Stew Chicken');
      const secondFoodEl = await screen.findByText('Chicken & mushroom Hotpot');
      const thirdFoodEl = await screen.findByText('Chicken Alfredo Primavera');

      expect(history.location.pathname).toBe('/foods');
      expect(firstFoodEl).toBeInTheDocument();
      expect(secondFoodEl).toBeInTheDocument();
      expect(thirdFoodEl).toBeInTheDocument();
    });
    test('Drinks', async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/explore/drinks/ingredients');
      const drinkCardEl = await screen.findByTestId('0-card-img');
      userEvent.click(drinkCardEl);
      const firstDrinkEl = await screen.findByText('151 Florida Bushwacker');
      const secondDrinkEl = await screen.findByText('155 Belmont');
      const thirdDrinkEl = await screen.findByText('3-Mile Long Island Iced Tea');

      expect(history.location.pathname).toBe('/drinks');
      expect(firstDrinkEl).toBeInTheDocument();
      expect(secondDrinkEl).toBeInTheDocument();
      expect(thirdDrinkEl).toBeInTheDocument();
    });
  });
});
