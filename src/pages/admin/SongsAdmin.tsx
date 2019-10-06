import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Song } from '../../api/types';
import { fetchResources } from '../../api/utils';

function SongsAdmin(): React.ReactElement {
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
      <h1>Songs Admin</h1>
      <div>
        {songs.map(song => (
          <div key={song._id}>
            <Link to={`songs/${song._id}`}>{song._id}</Link>
            <p>{song.name}</p>
            <p>{song.url}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SongsAdmin;
