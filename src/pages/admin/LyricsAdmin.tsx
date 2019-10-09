import React, { useEffect, useState, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { Lyric } from '../../api/types';
import { fetchResources, deleteResource } from '../../api/utils';

function LyricsAdmin(): React.ReactElement {
  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchLyrics(): Promise<void> {
    setLoading(true);
    const resources = await fetchResources<Lyric>('lyrics');
    setLyrics(resources);
    setLoading(false);
  }

  useEffect(() => {
    fetchLyrics();
  }, []);

  function handleDeleteClick(lyricId: string): MouseEventHandler {
    return async (): Promise<void> => {
      const res = await deleteResource('lyrics', lyricId);
      fetchLyrics();
      window.alert(res);
    };
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h1>Lyrics Admin</h1>
      <div>
        <Link to="/admin/lyrics/new">New</Link>
        {lyrics.map(lyric => (
          <div key={lyric._id}>
            <Link to={`lyrics/edit/${lyric._id}`}>{lyric._id}</Link>
            <button type="button" onClick={handleDeleteClick(lyric._id)}>
              Delete
            </button>
            <p>{lyric.name}</p>
            <p>{lyric.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LyricsAdmin;
