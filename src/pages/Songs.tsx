import React, { FunctionComponent, useEffect, useState, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { fetchResources, deleteResource } from '../api/utils';
import { Song } from '../api/types';
import { useAuthContext } from '../context/authContext';
import Container from '../styled/Container';
import { Card, CardContent, CardAction } from '../styled/Card';
import Header from '../components/Header';
import Button from '../components/Button';
import Fab from '../components/Fab';
import Loader from '../components/Loader';

const Songs: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [authState] = useAuthContext();

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

  function handleUpdateClick(songId: string): MouseEventHandler {
    return (): void => {
      history.push(`/admin/songs/edit/${songId}`);
    };
  }

  function handleDeleteClick(songId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm('Are you sure you want to delete the song?')) {
        const res = await deleteResource('songs', songId);
        fetchSongs();
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Songs" />
      {authState.isAuthenticated && <Fab url="/admin/songs/new" />}
      <Loader isLoading={isLoading}>
        <div className="row">
          {songs.map(song => (
            <div key={song.id} className="col s12 m4" style={{ marginBottom: '2em' }}>
              <Card>
                <CardContent style={{ padding: 0 }}>
                  <iframe
                    title={song.name}
                    src={song.url}
                    frameBorder="0"
                    allow="encrypted-media"
                    width="100%"
                    height="60%"
                  />
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(song.id)}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(song.id)}>
                      <i className="material-icons">delete</i>
                    </Button>
                  </CardAction>
                )}
              </Card>
            </div>
          ))}
        </div>
      </Loader>
    </Container>
  );
};

export default Songs;
