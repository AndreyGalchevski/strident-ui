import React, { FunctionComponent, ReactElement } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuthContext } from '../context/authContext';

const PrivateRoute: FunctionComponent<RouteProps> = props => {
  const [authState] = useAuthContext();

  let shouldRedirect = false;
  if (!authState.isAuthenticated) {
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    const redirectComponent = (): ReactElement => <Redirect to={{ pathname: '/login' }} />;
    return <Route {...props} component={redirectComponent} render={undefined} />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;
