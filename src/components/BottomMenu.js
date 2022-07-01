import React from 'react';
import './BottomMenu.css';
import { Link } from 'react-router-dom';
import newDrinkIcon from '../images/newDrinkIcon.png';
import newExploreIcon from '../images/newExploreIcon.png';
import newMealIcon from '../images/newMealIcon.png';

function BottomMenu() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ newDrinkIcon }
          alt="drink"
        />
      </Link>
      <Link to="/explore">
        <img
          data-testid="explore-bottom-btn"
          src={ newExploreIcon }
          alt="explore"
        />
      </Link>
      <Link to="/foods">
        <img
          data-testid="food-bottom-btn"
          src={ newMealIcon }
          alt="food"
        />
      </Link>
    </footer>
  );
}

export default BottomMenu;

// - Não tem footer na tela de login
// - Tem footer na tela de principal de receitas de comidas
// - Tem footer na tela de principal de receitas de bebidas
// - Não tem footer na tela de detalhes de uma receita de comida
// - Não tem footer na tela de detalhes de uma receita de bebida
// - Não tem footer na tela de receita em progresso de comida
// - Não tem footer na tela de receita em progresso de bebida
// - Tem footer na tela de explorar
// - Tem footer na tela de explorar comidas
// - Tem footer na tela de explorar bebidas
// - Tem footer na tela de explorar comidas por ingrediente
// - Tem footer na tela de explorar bebidas por ingrediente
// - Tem footer na tela de explorar comidas por nacionalidade
// - Tem footer na tela de perfil
// - Não tem footer na tela de receitas feitas
// - Não tem footer na tela de receitas favoritas
