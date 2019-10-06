import React, { Suspense, lazy } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Loader from '../components/Loader';
import PrivateRoute from '../components/PrivateRoute';
import { AuthProvider } from '../context/authContext';
import Navbar from '../components/Navbar';

const Home = withRouter(lazy(() => import('../pages/Home')));
const Members = withRouter(lazy(() => import('../pages/Members')));
const Songs = withRouter(lazy(() => import('../pages/Songs')));
const Videos = withRouter(lazy(() => import('../pages/Videos')));
const Gigs = withRouter(lazy(() => import('../pages/Gigs')));
const Login = withRouter(lazy(() => import('../pages/Login')));
const ManageHome = withRouter(lazy(() => import('../pages/admin/ManageHome')));
const ManageMembers = withRouter(lazy(() => import('../pages/admin/ManageMembers')));
const ManageSongs = withRouter(lazy(() => import('../pages/admin/ManageSongs')));
const ManageVideos = withRouter(lazy(() => import('../pages/admin/ManageVideos')));
const ManageGigs = withRouter(lazy(() => import('../pages/admin/ManageGigs')));

function App(): React.ReactElement {
  return (
    <main>
      <AuthProvider>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Route exact path="/" component={Home} />
          <Route exact path="/members" component={Members} />
          <Route exact path="/songs" component={Songs} />
          <Route exact path="/videos" component={Videos} />
          <Route exact path="/gigs" component={Gigs} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/admin/home" component={ManageHome} />
          <PrivateRoute exact path="/admin/members" component={ManageMembers} />
          <PrivateRoute exact path="/admin/songs" component={ManageSongs} />
          <PrivateRoute exact path="/admin/videos" component={ManageVideos} />
          <PrivateRoute exact path="/admin/gigs" component={ManageGigs} />
        </Suspense>
      </AuthProvider>
    </main>
  );
}

export default App;
