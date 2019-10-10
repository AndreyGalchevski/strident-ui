import React, { useState, ChangeEvent } from 'react';

import { Redirect } from 'react-router';
import { useAuthContext } from '../context/authContext';
import { LOGIN_SUCCESS } from '../context/authActionTypes';
import { login } from '../api/utils';
import Loader from '../components/Loader';

function Login(): React.ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [, dispatch] = useAuthContext();

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>): void {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  async function handleLogin(): Promise<void> {
    setLoading(true);
    const { token, err } = await login({ username, password });
    setLoading(false);
    if (err) {
      window.alert(err);
      return;
    }
    dispatch({ type: LOGIN_SUCCESS, payload: token });
    setShouldRedirect(true);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {shouldRedirect && <Redirect to="/admin" />}
      <section>
        <h3>Login</h3>
        <input type="text" placeholder="Username" onChange={handleUsernameChange} />
        <input type="password" placeholder="Password" onChange={handlePasswordChange} />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </section>
    </>
  );
}

export default Login;
