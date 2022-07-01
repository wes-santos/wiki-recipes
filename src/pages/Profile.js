import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import BottomMenu from '../components/BottomMenu';
import Header from '../components/Header';
import { getUserEmail, makeLogout, saveEmail } from '../services/localStorage';
import './profile.css';

function Profile() {
  const [currentEmail, setCurrentEmail] = useState('');
  useEffect(() => {
    if (getUserEmail() !== null) {
      const { email } = getUserEmail();
      setCurrentEmail(email);
    } else {
      saveEmail({ email: '' });
      const { email } = getUserEmail();
      setCurrentEmail(email);
    }
  }, []);

  const history = useHistory();

  return (
    <section>
      <Header />
      <h4 data-testid="profile-email" className="user-email">{ currentEmail }</h4>
      <div className="buttons">

        <Button
          type="button"
          variant="primary"
          className="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </Button>
        <Button
          variant="primary"
          type="button"
          className="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </Button>
        <Button
          variant="primary"
          type="button"
          className="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            makeLogout(null);
            history.push('/');
          } }
        >
          Logout
        </Button>
      </div>
      <BottomMenu />
    </section>
  );
}

export default Profile;
