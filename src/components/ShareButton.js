import React from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButton(pathname) {
  /* const location = useLocation();
  console.log(location); */

  const shareOnClick = ({ target }) => {
    copy(`http://localhost:3000${pathname}`);
    if (target.innerHTML === '') {
      target.parentElement.innerHTML = 'Link copied!';
    }
  };

  return (
    <button
      type="button"
      data-testid="share-btn"
      onClick={ shareOnClick }
      className="share-button"
    >
      <img
        src={ shareIcon }
        alt="share icon"
        className="share-button-image"
      />
    </button>
  );
}

export default ShareButton;
