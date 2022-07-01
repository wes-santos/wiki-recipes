import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import appContext from '../context/appContext';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import SearchTopButton from './SearchTopButton';
import './header.css';

function Header() {
  const { isHeaderSearch } = useContext(appContext);

  const history = useHistory();
  const { location: { pathname } } = history;

  const renderTittle = pathname.split('/')[1];
  const toDisplayStart = [
    '/explore/foods/nationalities', '/foods', '/drinks',
    '/in-progress', '/drinks/',
  ];
  const toDisplayEnds = [
    '/favorite-recipes', '/done-recipes', '/ingredients', 'explore/drinks',
    'explore/foods', 'explore', 'profile'];

  const isHiddenInput = toDisplayStart.filter((page) => pathname.startsWith(page));
  const isHiddenInput2 = toDisplayEnds.filter((page) => pathname.endsWith(page));

  let exploreTitle;
  if (pathname.includes('explore/')) {
    if (pathname.endsWith('/nationalities')) {
      exploreTitle = 'Explore Nationalities';
    } else if (pathname.endsWith('/ingredients')) {
      exploreTitle = 'Explore Ingredients';
    } else {
      exploreTitle = pathname.includes('foods') ? 'Explore Foods' : 'Explore Drinks';
    }
  }
  let doneRecipestitle;
  if (pathname === '/done-recipes') {
    doneRecipestitle = 'Done Recipes';
  } if (pathname === '/favorite-recipes') {
    doneRecipestitle = 'Favorite Recipes';
  }

  return (
    <header>
      <section className="header-infos">
        <button
          type="button"
          onClick={ () => history.push('/profile') }
        >
          <img src={ profileIcon } alt="profileIcon" data-testid="profile-top-btn" />
        </button>
        {exploreTitle ? (
          <h2 data-testid="page-title">{exploreTitle}</h2>
        ) : (
          <h2 data-testid="page-title">
            { doneRecipestitle || (
              renderTittle[0].toUpperCase() + renderTittle.substring(1)
            ).replace('-', ' ') }
          </h2>
        )}
        {
          isHiddenInput.length > 0 && isHiddenInput2.length === 0
            ? <SearchTopButton /> : <p />
        }

      </section>
      { isHeaderSearch === false && <SearchBar />}
    </header>
  );
}

export default Header;
