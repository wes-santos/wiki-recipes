import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { saveEmail, saveTokens } from '../services/localStorage';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validatePass = 7;
  const history = useHistory();

  const validateEmail = (testEmail) => {
    const regex = /\S+@\S+\.\S+\S+\S+/;
    return regex.test(testEmail);
  };
  return (
    <section className="login">
      <span className="logo">Wiki Recipes</span>
      <Form
        onSubmit={ (event) => {
          event.preventDefault();
          saveTokens();
          saveEmail({ email });
          history.push('/foods');
        } }
      >
        <Form.Group>
          <Form.Label htmlFor="email">
            Email:
            <Form.Control
              data-testid="email-input"
              name="email"
              type="email"
              value={ email }
              onChange={ ({ target: { value } }) => setEmail(value) }
              placeholder="Enter email"
            />
          </Form.Label>
          <Form.Label htmlFor="password">
            Senha:
            <Form.Control
              data-testid="password-input"
              name="password"
              type="password"
              onChange={ ({ target: { value } }) => setPassword(value) }
              value={ password }
              placeholder="Enter password"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group>
          <Button
            type="submit"
            data-testid="login-submit-btn"
            disabled={ password.length < validatePass || !validateEmail(email) }
          >
            Enter
          </Button>
        </Form.Group>
      </Form>
    </section>
  );
}

export default Login;
