import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useAuthContext } from '../context/authContext';

function PrivateRoute(props: RouteProps): React.ReactElement {
  const [authState] = useAuthContext();

  console.log(authState.isAuthenticated);

  let shouldRedirect = false;
  if (!authState.isAuthenticated) {
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    const redirectComponent = (): React.ReactElement => <Redirect to={{ pathname: '/login' }} />;
    return <Route {...props} component={redirectComponent} render={undefined} />;
  }
  return <Route {...props} />;
}

export default PrivateRoute;
