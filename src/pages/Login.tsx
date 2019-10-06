import React from 'react';

import { useAuthContext } from '../context/authContext';
import { LOGIN_SUCCESS } from '../context/authActionTypes';

function Login(): React.ReactElement {
  const [, dispatch] = useAuthContext();

  function handleLogin(): void {
    setTimeout(() => {
      dispatch({ type: LOGIN_SUCCESS, payload: 'fakeToken' });
    }, 2000);
  }

  return (
    <section>
      <h1>Login</h1>
      <button type="button" onClick={handleLogin}>
        Login
      </button>
    </section>
  );
}

export default Login;
