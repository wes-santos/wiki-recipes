import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    history, ...render(<Router history={ history }>{component}</Router>),
  });
};

export default renderWithRouter;
