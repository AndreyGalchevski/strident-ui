import React, { useState, ChangeEvent } from 'react';

import { useAuthContext } from '../context/authContext';
import { LOGIN_SUCCESS } from '../context/authActionTypes';
import { login } from '../api/utils';
import Loader from '../components/Loader';

function Login(): React.ReactElement {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

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
      alert(err);
      return;
    }
    dispatch({ type: LOGIN_SUCCESS, payload: token });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <h1>Login</h1>
      <input type="text" placeholder="Username" onChange={handleUsernameChange} />
      <input type="text" placeholder="Password" onChange={handlePasswordChange} />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </section>
  );
}

export default Login;
