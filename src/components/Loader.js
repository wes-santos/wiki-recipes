import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './loader.css';

function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      className="spinner"
    />
  );
}

export default Loader;
