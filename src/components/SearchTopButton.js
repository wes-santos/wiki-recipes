import React, { useContext } from 'react';
import appContext from '../context/appContext';
import searchIcon from '../images/searchIcon.svg';

function SearchTopButton() {
  const { isHeaderSearch, setIsHeaderSearch } = useContext(appContext);

  return (
    <button
      type="button"
      onClick={ () => setIsHeaderSearch(!isHeaderSearch) }
    >
      <img src={ searchIcon } alt="searchIcon" data-testid="search-top-btn" />
    </button>
  );
}

export default SearchTopButton;
