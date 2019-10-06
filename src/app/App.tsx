import React, { Suspense, lazy } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Loader from '../components/Loader';

const Home = withRouter(lazy(() => import('../pages/Home')));
const Members = withRouter(lazy(() => import('../pages/Members')));
const Songs = withRouter(lazy(() => import('../pages/Songs')));
const Videos = withRouter(lazy(() => import('../pages/Videos')));
const Gigs = withRouter(lazy(() => import('../pages/Gigs')));

function App(): React.ReactElement {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <Route exact path="/" component={Home} />
        <Route exact path="/members" component={Members} />
        <Route exact path="/songs" component={Songs} />
        <Route exact path="/videos" component={Videos} />
        <Route exact path="/gigs" component={Gigs} />
      </Suspense>
    </main>
  );
}

export default App;
