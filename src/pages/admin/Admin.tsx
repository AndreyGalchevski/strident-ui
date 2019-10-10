import React from 'react';
import { Link } from 'react-router-dom';

function Admin(): React.ReactElement {
  return (
    <section>
      <h3>Admin</h3>
      <div>
        <Link to="admin/home">Home</Link>
      </div>
      <div>
        <Link to="admin/members">Members</Link>
      </div>
      <div>
        <Link to="admin/songs">Songs</Link>
      </div>
      <div>
        <Link to="admin/videos">Videos</Link>
      </div>
      <div>
        <Link to="admin/gigs">Gigs</Link>
      </div>
      <div>
        <Link to="admin/lyrics">Lyrics</Link>
      </div>
    </section>
  );
}

export default Admin;
