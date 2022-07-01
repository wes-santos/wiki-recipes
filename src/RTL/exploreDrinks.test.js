import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './renderWithRouter';

const EXPLORE_DRINKS_PATH = '/explore/drinks';

describe('Verifica se', () => {
  beforeEach(() => {
    global.fetch = fetch;
  });

  test('Botões de filtro estão presentes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_DRINKS_PATH);
    const buttonsEls = screen.getAllByRole('button');
    expect(buttonsEls[1]).toBeInTheDocument();
    expect(buttonsEls[1].innerHTML).toBe('By Ingredient');
    expect(buttonsEls[2]).toBeInTheDocument();
    expect(buttonsEls[2].innerHTML).toBe('Surprise me!');
  });

  test('Botão `By Ingredient` leva para a página de ingredientes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_DRINKS_PATH);
    const buttonsEls = screen.getAllByRole('button');
    userEvent.click(buttonsEls[1]);
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });

  test('Botão `Suprise me` leva para a página de detalhes de alguma comida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(EXPLORE_DRINKS_PATH);
    const buttonsEls = screen.getAllByRole('button');
    userEvent.click(buttonsEls[2]);
    const recommendedTitleEl = await screen.findByRole(
      'heading', { name: 'Recommended' },
    );
    expect(recommendedTitleEl).toBeInTheDocument();
    expect(history.location.pathname).toMatch('/drinks/');
  });
});
