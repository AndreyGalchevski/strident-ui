import React, { useEffect, useState, MouseEventHandler } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';

import { fetchResources, deleteResource } from '../api/utils';
import { Song } from '../api/types';
import { useAuthContext } from '../context/authContext';
import Button from '../components/Button';
import { PRIMARY_COLOR } from '../utils/constants';
import Header from '../components/Header';
import PlusIcon from '../components/PlusIcon';

const styles = {
  song: {
    marginBottom: '2em',
  },
  card: {
    boxShadow: `0 4px 8px 0 ${PRIMARY_COLOR}, 0 6px 20px 0 ${PRIMARY_COLOR}`,
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
      const res = await deleteResource('songs', songId);
      fetchSongs();
      window.alert(res);
    };
  }

  return (
    <section>
      <Header title="Songs" />
      {authState.isAuthenticated && (
        <Link to="/admin/songs/new">
          <PlusIcon />
        </Link>
      )}
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="row">
          {songs.map(song => (
            <div key={song.id} className="col s12 m4" style={styles.song}>
              <div className="card" style={styles.cardContent}>
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
      )}
    </section>
  );
}

export default Songs;
