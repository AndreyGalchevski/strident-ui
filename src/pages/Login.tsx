import React, { FunctionComponent, useState, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';

import { useAuthContext } from '../context/authContext';
import { useMediaQuery } from '../hooks/mediaQueryHook';
import { LOGIN_SUCCESS } from '../context/authActionTypes';
import { login } from '../api/utils';
import { Card, CardContent, CardAction } from '../styled/Card';
import Loader from '../components/Loader';
import Button from '../components/Button';
import Input from '../components/Input';

export const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? '90vw' : '35vw',
  margin: 'auto',
}));

const Login: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [, dispatch] = useAuthContext();
  const isMobile = useMediaQuery('(max-width: 767px)');

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>): void {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>): void {
    setPassword(e.target.value);
  }

  async function handleLogin(): Promise<void> {
    setLoading(true);
    try {
      const token = await login({ username, password });
      dispatch({ type: LOGIN_SUCCESS, payload: token });
      setShouldRedirect(true);
    } catch (error) {
      window.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <>
      {shouldRedirect && <Redirect to="/" />}
      <Loader isLoading={isLoading}>
        <section>
          <h3>Login</h3>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="username"
                  type="text"
                  label="Username"
                  onChange={handleUsernameChange}
                  value={username}
                />
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  onChange={handlePasswordChange}
                  value={password}
                />
              </CardContent>
              <CardAction>
                <Button handleClick={handleLogin}>Login</Button>
              </CardAction>
            </Card>
          </Wrapper>
        </section>
      </Loader>
    </>
  );
};

export default Login;
