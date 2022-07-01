import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const BUTTON_AMOUNT = 4;

describe('Verifica se', () => {
  test('Header contém o texto `Profile`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const titleEl = screen.getByRole('heading', { name: 'Profile' });
    expect(titleEl.innerHTML).toBe('Profile');
  });

  test('A página tem três botões', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const buttonsEls = screen.getAllByRole('button');

    // O primeiro (0) corresponde ao avatar do perfil
    expect(buttonsEls.length).toEqual(BUTTON_AMOUNT);
  });

  test('Ao clicar no primeiro botão vamos para a página de receitas prontas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const buttonsEls = screen.getAllByRole('button');
    userEvent.click(buttonsEls[1]);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('Ao clicar no segundo botão vamos para a página de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const buttonsEls = screen.getAllByRole('button');
    userEvent.click(buttonsEls[2]);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('Ao clicar no terceiro botão vamos para a página de login', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const buttonsEls = screen.getAllByRole('button');
    userEvent.click(buttonsEls[3]);
    expect(history.location.pathname).toBe('/');
  });
});
