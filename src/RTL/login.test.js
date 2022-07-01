import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test do Login', () => {
  test(
    'Verifica se existe os inputs de email e senha',
    () => {
      renderWithRouter(<App />);
      const emailInputEl = screen.getByRole('textbox');
      const passInputEl = screen.getByLabelText('Senha:');
      expect(emailInputEl).toBeInTheDocument();
      expect(passInputEl).toBeInTheDocument();
    },
  );

  test(
    'Verifica se ao clicar no botão "Enter" é redirecionado à página de receitas ',
    async () => {
      const { history } = renderWithRouter(<App />);

      const emailInputEl = screen.getByRole('textbox');
      const passInputEl = screen.getByLabelText('Senha:');
      const btnEl = screen.getByRole('button', { name: 'Enter' });
      userEvent.type(emailInputEl, 'aaaa@bbbbb.com');
      userEvent.type(passInputEl, '1234567');
      userEvent.click(btnEl);

      const foodsTitle = await screen.findByRole('heading', { name: 'Foods' });
      expect(foodsTitle).toBeInTheDocument();
      expect(history.location.pathname).toBe('/foods');
    },
  );
});
