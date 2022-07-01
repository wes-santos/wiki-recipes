import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

function AppProvider({ children }) {
  // const [radioFilter, setRadioFilter] = useState('');
  // const [nameFilter, setNameFilter] = useState('');
  const [drinks, setDrinks] = useState([]);
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isHeaderSearch, setIsHeaderSearch] = useState(true);

  const gettersAndSetters = {
    // radioFilter,
    // setRadioFilter,
    // nameFilter,
    // setNameFilter,
    drinks,
    setDrinks,
    foods,
    setFoods,
    categories,
    setCategories,
    isHeaderSearch,
    setIsHeaderSearch,
  };

  return (
    <appContext.Provider
      value={ gettersAndSetters }
    >
      {children}
    </appContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
