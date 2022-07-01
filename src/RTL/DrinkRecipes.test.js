import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test da tela de receitas de comida', () => {
  beforeEach(() => {
    global.fetch = fetch;
  });

  test(
    'Verifica se alguns dos elementos da tela estão presentes',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
      const foodsTitle = await screen.findByRole('heading', { name: 'Drinks' });
      expect(foodsTitle).toBeInTheDocument();
    },
  );
  test(
    'Verifica se ao clicar na primeira foto, é redirecinado para os detalhes dela',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');

      const firstImgEl = await screen.findByRole('button', { name: 'GG' });
      userEvent.click(firstImgEl);
      expect(history.location.pathname).toBe('/drinks/15997');
    },
  );
  test(
    'Verifica se ao clicar no icone de perfil o URL muda para "/profile"',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
      const btnsEl = await screen.findAllByRole('button');
      userEvent.click(btnsEl[0]);
      expect(history.location.pathname).toBe('/profile');
      // const searchInputEl = await screen.findByRole('textbox');
      // expect(searchInputEl).toBeInTheDocument();
    },
  );
  test(
    'Verifica se ao clicar no botão "Ordinary Drink" o texto "410 Gone" aparece na tela',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
      const secondFilterBtnEl = await screen.findByRole('button',
        { name: 'Ordinary Drink' });
      userEvent.click(secondFilterBtnEl);
      const secondDrinkEl = await screen.findByRole('button', { name: '410 Gone' });
      expect(secondDrinkEl).toBeInTheDocument();
      // const searchInputEl = await screen.findByRole('textbox');
      // expect(searchInputEl).toBeInTheDocument();
    },
  );
});
