import React from 'react';
import { useHistory } from 'react-router-dom';
import logout from '../images/logout.svg';
import { makeLogout } from '../services/localStorage';

function LogoutButton() {
  const history = useHistory();

  return (
    <button
      type="button"
      onClick={ () => {
        makeLogout(null);
        history.push('/');
      } }
    >
      <img src={ logout } alt="logout" />
    </button>
  );
}

export default LogoutButton;

// esse botao foi criado antes de eu ler os testes, achei que poderia usar um svg como value porem o teste pede que seja um texto 'Logout' mas resolvi deixalo no projeto
