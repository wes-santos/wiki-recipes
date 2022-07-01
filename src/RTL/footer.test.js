import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const FOOTER_ROLE = 'contentinfo';

describe('Verifica se', () => {
  test('Footer está presente em todas as páginas que deve estar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    let footerEl = screen.getByRole(FOOTER_ROLE);
    expect(footerEl).toBeInTheDocument();

    history.push('/drinks');
    footerEl = screen.getByRole(FOOTER_ROLE);
    expect(footerEl).toBeInTheDocument();

    history.push('/explore');
    footerEl = screen.getByRole(FOOTER_ROLE);
    expect(footerEl).toBeInTheDocument();

    history.push('/explore/foods');
    footerEl = screen.getByRole(FOOTER_ROLE);
    expect(footerEl).toBeInTheDocument();

    history.push('/explore/foods/ingredients');
    footerEl = screen.getByRole(FOOTER_ROLE);
    expect(footerEl).toBeInTheDocument();

    history.push('/explore/drinks');
    footerEl = screen.getByRole(FOOTER_ROLE);
    expect(footerEl).toBeInTheDocument();

    history.push('/explore/drinks/ingredients');
    footerEl = screen.getByRole(FOOTER_ROLE);
    expect(footerEl).toBeInTheDocument();
  });

  test('Ao clicar no icone de Drink, vamos para a página de drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const drinkIconEl = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkIconEl);
    expect(history.location.pathname).toBe('/drinks');
  });

  test('Ao clicar no icone de Food, vamos para a página de foods', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const foodIconEl = screen.getByTestId('food-bottom-btn');
    userEvent.click(foodIconEl);
    expect(history.location.pathname).toBe('/foods');
  });

  test('Ao clicar no icone de Explore, vamos para a página explore', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const exploreIconEl = screen.getByTestId('explore-bottom-btn');
    userEvent.click(exploreIconEl);
    expect(history.location.pathname).toBe('/explore');
  });
});
