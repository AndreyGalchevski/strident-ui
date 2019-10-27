import React, { useEffect, useState, MouseEventHandler, CSSProperties } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { fetchResources, deleteResource } from '../api/utils';
import { Song } from '../api/types';
import { useAuthContext } from '../context/authContext';
import Button from '../components/Button';
import { PRIMARY_COLOR, LIGHT_COLOR } from '../utils/constants';
import Header from '../components/Header';
import Fab from '../components/Fab';
import Loader from '../components/Loader';

const styles = {
  container: {
    marginBottom: '17vh',
  },
  song: {
    marginBottom: '2em',
  },
  card: {
    boxShadow: `0 4px 8px 0 ${PRIMARY_COLOR}, 0 6px 20px 0 ${PRIMARY_COLOR}`,
    backgroundColor: PRIMARY_COLOR,
    color: LIGHT_COLOR,
  },
  cardContent: {
    padding: 0,
  },
};

function Songs(props: RouteComponentProps): React.ReactElement {
  const { history } = props;

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
    <section style={styles.container as CSSProperties}>
      <Header title="Songs" />
      {authState.isAuthenticated && <Fab url="/admin/songs/new" />}
      <Loader isLoading={isLoading}>
        <div className="row">
          {songs.map(song => (
            <div key={song.id} className="col s12 m4" style={styles.song}>
              <div className="card" style={styles.card}>
                <div className="card-content" style={styles.cardContent}>
                  <iframe
                    title={song.name}
                    src={song.url}
                    frameBorder="0"
                    allow="encrypted-media"
                    width="100%"
                    height="60%"
                  />
                </div>
                {authState.isAuthenticated && (
                  <div className="card-action">
                    <Button handleClick={handleUpdateClick(song.id)}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(song.id)}>
                      <i className="material-icons">delete</i>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Loader>
    </section>
  );
}

export default Songs;
