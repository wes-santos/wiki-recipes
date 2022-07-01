import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica se', () => {
  beforeEach(() => {
    global.fetch = fetch;
  });

  test(
    'Alguns dos elementos das tela estão presentes',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
      const foodsTitle = await screen.findByRole('heading', { name: 'Foods' });
      const firstFoodCard = await screen.findByTestId('0-recipe-card');
      const secondFoodCard = await screen.findByTestId('1-recipe-card');
      const thirdFoodCard = await screen.findByTestId('2-recipe-card');
      expect(firstFoodCard).toBeInTheDocument();
      expect(secondFoodCard).toBeInTheDocument();
      expect(thirdFoodCard).toBeInTheDocument();
      expect(foodsTitle).toBeInTheDocument();
    },
  );

  test(
    'Ao clicar na primeira foto, é redirecinado para os detalhes dela',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');

      const firstImgEl = await screen.findByRole('button', { name: 'Corba' });
      userEvent.click(firstImgEl);
      expect(history.location.pathname).toBe('/foods/52977');
    },
  );
  test(
    'Ao clicar na lupa aparece o campo de busca',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
      const btnsEl = await screen.findAllByRole('button');
      userEvent.click(btnsEl[1]);
      const searchInputEl = await screen.findByRole('textbox');
      expect(searchInputEl).toBeInTheDocument();
    },
  );
  test(
    'Existe o icone de Drink e se ao clicar nele a URL muda para "/drinks"',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
      const drinkIconEl = await screen.findByAltText('drink');
      expect(drinkIconEl).toBeInTheDocument();
      userEvent.click(drinkIconEl);
      console.log(history.location.pathname);
      expect(history.location.pathname).toBe('/drinks');
    },
  );
  test(
    'Existe o icone de Explore e se ao clicar nele a URL muda para "/explore"',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
      const exploreIconEl = await screen.findByAltText('explore');
      expect(exploreIconEl).toBeInTheDocument();
      userEvent.click(exploreIconEl);
      expect(history.location.pathname).toBe('/explore');
    },
  );
});
