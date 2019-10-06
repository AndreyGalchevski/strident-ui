import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Song } from '../../api/types';
import { fetchResource } from '../../api/utils';

function ManageSong(props: RouteComponentProps): React.ReactElement {
  const { match } = props;
  const [song, setSong] = useState<Song>({} as Song);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSong(): Promise<void> {
      setLoading(true);
      const resource = await fetchResource<Song>('songs', match.params.id);
      setSong(resource);
      setLoading(false);
    }

    fetchSong();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h1>Manage Song</h1>
      <div>
        <p>{song._id}</p>
        <p>{song.name}</p>
        <p>{song.url}</p>
      </div>
    </section>
  );
}

export default ManageSong;
