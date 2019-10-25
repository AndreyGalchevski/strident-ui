import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { Song } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';

type MatchParams = {
  id: string;
};

const styles = {
  container: {
    marginBottom: '4em',
  },
};

function ManageSong(props: RouteComponentProps<MatchParams>): React.ReactElement {
  const { match } = props;
  const [song, setSong] = useState<Song>({} as Song);
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

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
    }
    setShouldRedirect(true);
    setLoading(false);
    window.alert(res);
  }

  return (
    <>
      {shouldRedirect && <Redirect to="/songs" />}
      <section style={styles.container}>
        {match.params.id ? <h3>Update Song</h3> : <h3>Create Song</h3>}
        <Loader isLoading={isLoading}>
          <div className="row">
            <div className="col s12 m4 offset-m4">
              <div className="card">
                <div className="card-content">
                  <Input
                    name="name"
                    type="text"
                    label="Name"
                    onChange={handleFormChange}
                    value={song.name}
                  />
                  <Input
                    name="url"
                    type="text"
                    label="URL"
                    onChange={handleFormChange}
                    value={song.url}
                  />
                  <Input
                    name="album"
                    type="text"
                    label="Album"
                    onChange={handleFormChange}
                    value={song.album}
                  />
                </div>
                <div className="card-action">
                  <Button handleClick={handleSaveClick}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        </Loader>
      </section>
    </>
  );
}

export default ManageSong;
