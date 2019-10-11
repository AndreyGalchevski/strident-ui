import React, { Suspense, lazy, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';

import Loader from '../components/Loader';
import PrivateRoute from '../components/PrivateRoute';
import decodeJWT from '../utils/jwt';

const Home = withRouter(lazy(() => import('../pages/Home')));
const Members = withRouter(lazy(() => import('../pages/Members')));
const Songs = withRouter(lazy(() => import('../pages/Songs')));
const Videos = withRouter(lazy(() => import('../pages/Videos')));
const Gigs = withRouter(lazy(() => import('../pages/Gigs')));
const Lyrics = withRouter(lazy(() => import('../pages/Lyrics')));
const Login = withRouter(lazy(() => import('../pages/Login')));
const ManageMember = withRouter(lazy(() => import('../pages/admin/ManageMember')));
const ManageSong = withRouter(lazy(() => import('../pages/admin/ManageSong')));
const ManageVideo = withRouter(lazy(() => import('../pages/admin/ManageVideo')));
const ManageGig = withRouter(lazy(() => import('../pages/admin/ManageGig')));
const ManageLyric = withRouter(lazy(() => import('../pages/admin/ManageLyric')));

const styles = {
  overflowY: 'scroll',
  height: '100%',
};

function App(): React.ReactElement {
  useEffect(() => {
    const token = localStorage.getItem('stridentToken');
    if (token) {
      const decodedData = decodeJWT(token);
      const currentTime = Date.now() / 1000;
      if (decodedData.exp < currentTime) {
        localStorage.removeItem('stridentToken');
        window.location.href = '/login';
      }
    }
  }, []);

  return (
    <main style={styles}>
      <Suspense fallback={<Loader />}>
        <Route exact path="/" component={Home} />
        <Route exact path="/members" component={Members} />
        <Route exact path="/songs" component={Songs} />
        <Route exact path="/videos" component={Videos} />
        <Route exact path="/gigs" component={Gigs} />
        <Route exact path="/lyrics" component={Lyrics} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact key="new-member" path="/admin/members/new" component={ManageMember} />
        <PrivateRoute
          exact
          key="edit-member"
          path="/admin/members/edit/:id"
          component={ManageMember}
        />
        <PrivateRoute exact key="new-song" path="/admin/songs/new" component={ManageSong} />
        <PrivateRoute exact key="edit-song" path="/admin/songs/edit/:id" component={ManageSong} />
        <PrivateRoute exact key="new-video" path="/admin/videos/new" component={ManageVideo} />
        <PrivateRoute
          exact
          key="edit-video"
          path="/admin/videos/edit/:id"
          component={ManageVideo}
        />
        <PrivateRoute exact key="new-gig" path="/admin/gigs/new" component={ManageGig} />
        <PrivateRoute exact key="edit-gig" path="/admin/gigs/edit/:id" component={ManageGig} />
        <PrivateRoute exact key="new-lyric" path="/admin/lyrics/new" component={ManageLyric} />
        <PrivateRoute
          exact
          key="edit-lyric"
          path="/admin/lyrics/edit/:id"
          component={ManageLyric}
        />
      </Suspense>
    </main>
  );
}

export default App;
