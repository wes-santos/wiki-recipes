import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './renderWithRouter';

const PATH_NAME = '/explore/foods/nationalities';

describe('Verifica se', () => {
  beforeEach(() => {
    global.fetch = fetch;
  });

  test('Header contém `Explore Nationalities` como título', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);
    const headerTitle = screen.getByRole('heading', { name: 'Explore Nationalities' });
    expect(headerTitle.innerHTML).toBe('Explore Nationalities');
  });

  // Créditos pelo auxílio em testar o elemento select:
  // https://cathalmacdonnacha.com/how-to-test-a-select-element-with-react-testing-library
  test('Select com as nacionalidades está presente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);
    const selectEl = await screen.findByRole('combobox');
    const defaultOption = await screen.findByRole('option', { name: 'All' });
    expect(selectEl).toBeInTheDocument();
    expect(defaultOption.selected).toBeTruthy();
  });

  test('É possível filtrar por nacionalidade', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(PATH_NAME);
    const selectEl = await screen.findByTestId('explore-by-nationality-dropdown');
    const americanOption = await screen.findByTestId('American-option');
    userEvent.selectOptions(selectEl, americanOption);
    const firstCardEl = await screen.findByText('Banana Pancakes');
    expect(firstCardEl).toBeInTheDocument();
    // expect(americanOption.selected).toBeTruthy();
  });
});
