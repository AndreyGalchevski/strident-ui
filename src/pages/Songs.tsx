import React, { useEffect, useState } from 'react';

import { fetchResources } from '../api/utils';
import { Song } from '../api/types';

const styles = {
  song: {
    marginBottom: '2em',
  },
};

function Songs(): React.ReactElement {
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
      <h3>Songs</h3>
      <div className="row">
        {songs.map(song => (
          <div key={song._id} className="col s12 m4" style={styles.song}>
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
