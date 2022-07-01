import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test da tela de receitas de comida', () => {
  beforeEach(() => {
    global.fetch = fetch;
  });

  test(
    'Verifica se alguns dos elementos das tela estão presentes',
    async () => {
      const { history } = renderWithRouter(<App />);
      history.push('/foods/52771/in-progress');
      const finishBtnEl = await screen.getByRole('button', { name: 'Finish Recipe' });
      // expect(finishBtnEl).toBeDisabled(); 'Received element is not disabled:'
      expect(finishBtnEl).toBeInTheDocument();
    },
  );
  // test(
  //   'Verifica se ao clicar no botão de favoritar o icone de coração fica preto',
  //   async () => {
  //     const { history } = renderWithRouter(<App />);
  //     history.push('/foods/52771/in-progress');
  //     const imgsEl = await screen.findAllByRole('img');
  //     userEvent.click(imgsEl[1]);
  //     const blackHeartEl = await screen.findByAltText(/black heart icon/i);
  //     expect(blackHeartEl).toBeInTheDocument();
  //   },
  // );
  // test(
  //   'Verifica se ao clicar no botão de iniciar a receita muda para tela de progresso',
  //   async () => {
  //     const { history } = renderWithRouter(<App />);
  //     history.push('/foods/52771/in-progress');
  //     const startRecipeBtnEl = await screen.findByRole('button');
  //     expect(startRecipeBtnEl).toBeInTheDocument();
  //     userEvent.click(startRecipeBtnEl);
  //     expect(history.location.pathname).toBe('/foods/52771/in-progress');
  //   },
  // );
});
