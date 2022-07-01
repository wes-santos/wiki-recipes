import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const FOODS_PATH = '/foods/52771';

describe('Test da tela de receitas de comida', () => {
  beforeEach(() => {
    global.fetch = fetch;
  });

  test(
    'Verifica se alguns dos elementos das tela estão presentes',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(FOODS_PATH);
      const ingredientsEl = await screen
        .findByRole('heading', { name: 'Ingredientes', level: 3 });
      expect(ingredientsEl).toBeInTheDocument();
    },
  );
  test(
    'Verifica se ao clicar no botão de favoritar o icone de coração fica preto',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(FOODS_PATH);
      const imgsEl = await screen.findAllByRole('img');
      userEvent.click(imgsEl[1]);
      const blackHeartEl = await screen.findByAltText(/black heart icon/i);
      expect(blackHeartEl).toBeInTheDocument();
      // const textEl = await screen.findByText(/Link copied!/i);
      // expect(textEl).toBeInTheDocument();
    },
  );
  test(
    'Verifica se ao clicar no botão de iniciar a receita muda para tela de progresso',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push(FOODS_PATH);
      const startRecipeBtnEl = await screen.findByRole('button');
      expect(startRecipeBtnEl).toBeInTheDocument();
      userEvent.click(startRecipeBtnEl);
      expect(history.location.pathname).toBe('/foods/52771/in-progress');
    },
  );

  // test(
  //   'Verifica se ao clicar na primeira foto, é redirecinado para os detalhes dela',
  //   async () => {
  //     const { history } = renderWithRouter(<App />);
  //     history.push('/drinks');

  //     const firstImgEl = await screen.findByRole('button', { name: 'GG' });
  //     userEvent.click(firstImgEl);
  //     expect(history.location.pathname).toBe('/drinks/15997');
  //   },
  // );
  // test(
  //   'Verifica se ao clicar no icone de perfil o URL muda para "/profile"',
  //   async () => {
  //     const { history } = renderWithRouter(<App />);
  //     history.push('/drinks');
  //     const btnsEl = await screen.findAllByRole('button');
  //     userEvent.click(btnsEl[0]);
  //     expect(history.location.pathname).toBe('/profile');
  //     // const searchInputEl = await screen.findByRole('textbox');
  //     // expect(searchInputEl).toBeInTheDocument();
  //   },
  // );
  // test(
  //   'Verifica se ao clicar no botão "Ordinary Drink" o texto "410 Gone" aparece na tela',
  //   async () => {
  //     const { history } = renderWithRouter(<App />);
  //     history.push('/drinks');
  //     const secondFilterBtnEl = await screen.findByRole('button',
  //       { name: 'Ordinary Drink' });
  //     userEvent.click(secondFilterBtnEl);
  //     const secondDrinkEl = await screen.findByRole('button', { name: '410 Gone' });
  //     expect(secondDrinkEl).toBeInTheDocument();
  //     // const searchInputEl = await screen.findByRole('textbox');
  //     // expect(searchInputEl).toBeInTheDocument();
  //   },
  // );
});
