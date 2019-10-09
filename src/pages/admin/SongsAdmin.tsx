import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { Song } from '../../api/types';
import { fetchResources, deleteResource } from '../../api/utils';

function SongsAdmin(): React.ReactElement {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchSongs(): Promise<void> {
    setLoading(true);
    const resources = await fetchResources<Song>('songs');
    setSongs(resources);
    setLoading(false);
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  function handleDeleteClick(songId: string): MouseEventHandler {
    return async (): Promise<void> => {
      const res = await deleteResource('songs', songId);
      fetchSongs();
      window.alert(res);
    };
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h3>Songs Admin</h3>
      <div>
        <Link to="/admin/songs/new">New</Link>
        {songs.map(song => (
          <div key={song._id}>
            <Link to={`songs/edit/${song._id}`}>{song._id}</Link>
            <button type="button" onClick={handleDeleteClick(song._id)}>
              Delete
            </button>
            <p>{song.name}</p>
            <p>{song.url}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SongsAdmin;
