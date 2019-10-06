import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
}

function PrivateRoute(props: PrivateRouteProps): React.ReactElement {
  const { isAuthenticated } = props;

  let shouldRedirect = false;
  if (!isAuthenticated) {
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    const redirectComponent = (): React.ReactElement => <Redirect to={{ pathname: '/login' }} />;
    return <Route {...props} component={redirectComponent} render={undefined} />;
  }
  return <Route {...props} />;
}

export default PrivateRoute;
