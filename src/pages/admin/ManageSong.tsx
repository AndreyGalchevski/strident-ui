import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Song } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';

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

    if (match.params.id) {
      fetchSong();
    }
  }, []);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setSong({ ...song, [e.target.name]: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    let res = '';
    setLoading(true);
    if (match.params.id) {
      res = await updateResource<Song>('songs', match.params.id, song);
    } else {
      res = await createResource<Song>('songs', song);
      setSong({} as Song);
    }
    setLoading(false);
    window.alert(res);
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      {match.params.id ? <h1>Update Song</h1> : <h1>Create Song</h1>}
      <div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleFormChange}
            value={song.name}
          />
        </div>
        <div>
          <input
            type="text"
            name="url"
            placeholder="URL"
            onChange={handleFormChange}
            value={song.url}
          />
        </div>
        <button type="button" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </section>
  );
}

export default ManageSong;
