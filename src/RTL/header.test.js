import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

const SEARCH_ICON_TESTID = 'search-top-btn';
const SEARCH_INPUT_TESTID = 'exec-search-btn';

describe('Verifica se', () => {
  describe('Header funciona normalmente na página de comidas', () => {
    beforeEach(() => {
      global.fetch = fetch;
      const { history } = renderWithRouter(<App />);
      history.push('/foods');
    });

    test('É possível pesquisar por ingrediente', async () => {
      const searchIcon = await screen.findByTestId(SEARCH_ICON_TESTID);
      userEvent.click(searchIcon);
      const searchInputEl = await screen.findByRole('textbox');
      userEvent.type(searchInputEl, 'Chicken');
      const ingredientRadioEl = await screen.findByLabelText('Ingredient');
      userEvent.click(ingredientRadioEl);
      const searchButtonEl = await screen.findByTestId(SEARCH_INPUT_TESTID);
      userEvent.click(searchButtonEl);
      const foodEl = await screen.findByText('Brown Stew Chicken');
      expect(foodEl).toBeInTheDocument();
    });

    test('É possível pesquisar por nome', async () => {
      const searchIcon = await screen.findByTestId(SEARCH_ICON_TESTID);
      userEvent.click(searchIcon);
      const searchInputEl = await screen.findByRole('textbox');
      userEvent.type(searchInputEl, 'Arrabiata');
      const nameRadioEl = await screen.findByLabelText('Name');
      userEvent.click(nameRadioEl);
      const searchButtonEl = await screen.findByTestId(SEARCH_INPUT_TESTID);
      userEvent.click(searchButtonEl);
      const foodEl = await screen.findByRole(
        'heading', { name: 'Spicy Arrabiata Penne' },
      );
      expect(foodEl).toBeInTheDocument();
    });
  });

  describe('Header funciona normalmente na página de bebidas', () => {
    beforeEach(() => {
      global.fetch = fetch;
      const { history } = renderWithRouter(<App />);
      history.push('/drinks');
    });

    test('É possível pesquisar por ingrediente', async () => {
      const searchIcon = await screen.findByTestId(SEARCH_ICON_TESTID);
      userEvent.click(searchIcon);
      const searchInputEl = await screen.findByRole('textbox');
      userEvent.type(searchInputEl, 'Light rum');
      const ingredientRadioEl = await screen.findByLabelText('Ingredient');
      userEvent.click(ingredientRadioEl);
      const searchButtonEl = await screen.findByTestId(SEARCH_INPUT_TESTID);
      userEvent.click(searchButtonEl);
      const foodEl = await screen.findByText('151 Florida Bushwacker');
      expect(foodEl).toBeInTheDocument();
    });

    test('É possível pesquisar por nome', async () => {
      const searchIcon = await screen.findByTestId(SEARCH_ICON_TESTID);
      userEvent.click(searchIcon);
      const searchInputEl = await screen.findByRole('textbox');
      userEvent.type(searchInputEl, 'Aquamarine');
      const nameRadioEl = await screen.findByLabelText('Name');
      userEvent.click(nameRadioEl);
      const searchButtonEl = await screen.findByTestId(SEARCH_INPUT_TESTID);
      userEvent.click(searchButtonEl);
      const foodEl = await screen.findByRole(
        'heading', { name: 'Aquamarine' },
      );
      expect(foodEl).toBeInTheDocument();
    });
  });
});
