import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './renderWithRouter';

describe('Verifica se', () => {
  beforeEach(() => {
    global.fetch = fetch;
  });

  test('Header está presente e contém o nome Explore e o ícone de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const headerEl = screen.getByRole('banner');
    const imageEl = screen.getAllByRole('img');
    const titleEl = screen.getByRole('heading', { name: 'Explore' });

    expect(headerEl).toBeInTheDocument();
    expect(titleEl).toBeInTheDocument();
    expect(imageEl[0]).toHaveAttribute('src', 'profileIcon.svg');
  });

  test('Existe um botão `Explore Foods`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const buttonEl = screen.getAllByRole('button');
    expect(buttonEl[1].innerHTML).toBe('Explore Foods');
  });

  test(
    'Ao clicar no botão de `Explore Foods`,'
    + ' '
    + 'é feito um redirecionamento para a próxima página de explore',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/explore');
      const buttonEl = screen.getAllByRole('button');
      userEvent.click(buttonEl[1]);
      expect(history.location.pathname).toBe('/explore/foods');
    },
  );

  test(
    'Ao clicar no botão de `Explore Drinks`,'
    + ' '
    + 'é feito um redirecionamento para a próxima página de explore',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/explore');
      const buttonEl = screen.getAllByRole('button');
      userEvent.click(buttonEl[2]);
      expect(history.location.pathname).toBe('/explore/drinks');
    },
  );

  test('Existe um botão `Explore Drinks`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const buttonEl = screen.getAllByRole('button');
    expect(buttonEl[2].innerHTML).toBe('Explore Drinks');
  });

  test('Footer está presente e contém seus elementos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explore');
    const footerEl = screen.getByRole('contentinfo');
    const imgEls = screen.getAllByRole('img');
    console.log(imgEls[1]);
    expect(footerEl).toBeInTheDocument();
    expect(imgEls[1]).toHaveAttribute('src', 'newDrinkIcon.png');
    expect(imgEls[2]).toHaveAttribute('src', 'newExploreIcon.png');
    expect(imgEls[3]).toHaveAttribute('src', 'newMealIcon.png');
  });
});
