import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchResources } from '../api/utils';
import { Song } from '../api/types';
import { useAuthContext } from '../context/authContext';
import { ACCENT_COLOR } from '../utils/constants';

const styles = {
  song: {
    marginBottom: '2em',
  },
};

function Songs(): React.ReactElement {
  const [authState] = useAuthContext();

  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSongs(): Promise<void> {
      setLoading(true);
      const resources = await fetchResources<Song>('songs');
      setSongs(resources);
      setLoading(false);
    }

    fetchSongs();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h3>
        Songs
        {authState.isAuthenticated && (
          <Link to="/admin/songs/new">
            <i className="material-icons" style={{ color: ACCENT_COLOR }}>
              add
            </i>
          </Link>
        )}
      </h3>
      <div className="row">
        {songs.map(song => (
          <div key={song._id} className="col s12 m4" style={styles.song}>
            {authState.isAuthenticated && (
              <div style={{ position: 'relative', float: 'right', right: '100px', top: '6px' }}>
                <Link to={`/admin/songs/edit/${song._id}`} style={{ color: 'white' }}>
                  <i className="material-icons">edit</i>
                </Link>
              </div>
            )}
            <iframe
              title={song.name}
              src={song.url}
              frameBorder="0"
              allow="encrypted-media"
              width="300"
              height="380"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Songs;
