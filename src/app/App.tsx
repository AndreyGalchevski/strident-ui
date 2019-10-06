import React, { Suspense, lazy } from 'react';
import { Route, withRouter } from 'react-router-dom';

import { AuthProvider } from '../context/authContext';

import Loader from '../components/Loader';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';

const Home = withRouter(lazy(() => import('../pages/Home')));
const Members = withRouter(lazy(() => import('../pages/Members')));
const Songs = withRouter(lazy(() => import('../pages/Songs')));
const Videos = withRouter(lazy(() => import('../pages/Videos')));
const Gigs = withRouter(lazy(() => import('../pages/Gigs')));
const Lyrics = withRouter(lazy(() => import('../pages/Lyrics')));
const Login = withRouter(lazy(() => import('../pages/Login')));
const HomeAdmin = withRouter(lazy(() => import('../pages/admin/HomeAdmin')));
const MembersAdmin = withRouter(lazy(() => import('../pages/admin/MembersAdmin')));
const ManageMember = withRouter(lazy(() => import('../pages/admin/ManageMember')));
const SongsAdmin = withRouter(lazy(() => import('../pages/admin/SongsAdmin')));
const ManageSong = withRouter(lazy(() => import('../pages/admin/ManageSong')));
const VideosAdmin = withRouter(lazy(() => import('../pages/admin/VideosAdmin')));
const ManageVideo = withRouter(lazy(() => import('../pages/admin/ManageVideo')));
const GigsAdmin = withRouter(lazy(() => import('../pages/admin/GigsAdmin')));
const ManageGig = withRouter(lazy(() => import('../pages/admin/ManageGig')));
const LyricsAdmin = withRouter(lazy(() => import('../pages/admin/LyricsAdmin')));
const ManageLyric = withRouter(lazy(() => import('../pages/admin/ManageLyric')));

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
          <Route exact path="/lyrics" component={Lyrics} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/admin/home" component={HomeAdmin} />
          <PrivateRoute exact path="/admin/members" component={MembersAdmin} />
          <PrivateRoute exact path="/admin/members/:id" component={ManageMember} />
          <PrivateRoute exact path="/admin/songs" component={SongsAdmin} />
          <PrivateRoute exact path="/admin/songs/:id" component={ManageSong} />
          <PrivateRoute exact path="/admin/videos" component={VideosAdmin} />
          <PrivateRoute exact path="/admin/videos/:id" component={ManageVideo} />
          <PrivateRoute exact path="/admin/gigs" component={GigsAdmin} />
          <PrivateRoute exact path="/admin/gigs/:id" component={ManageGig} />
          <PrivateRoute exact path="/admin/lyrics" component={LyricsAdmin} />
          <PrivateRoute exact path="/admin/lyrics/:id" component={ManageLyric} />
        </Suspense>
      </AuthProvider>
    </main>
  );
}

export default App;
