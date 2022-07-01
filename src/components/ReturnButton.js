import React from 'react';
import { useHistory } from 'react-router-dom';
import returnIcon from '../images/returnIcon.svg';

function ReturnButton() {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <button
      type="button"
      variant="primary"
      onClick={ () => (pathname.includes('foods')
        ? history.push('/foods') : history.push('/drinks')) }
    >
      <img
        src={ returnIcon }
        alt="return icon"
        className="return-button-image"
      />
    </button>
  );
}

export default ReturnButton;
