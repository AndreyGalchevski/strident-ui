import React, { useEffect, useState, MouseEventHandler } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { fetchResources, deleteResource } from '../api/utils';
import { Lyric } from '../api/types';
import { LIGHT_COLOR } from '../utils/constants';
import { useAuthContext } from '../context/authContext';
import PlusIcon from '../components/PlusIcon';
import Button from '../components/Button';

const styles = {
  card: {
    boxShadow: `0 4px 8px 0 ${LIGHT_COLOR}, 0 6px 20px 0 ${LIGHT_COLOR}`,
  },
};

function Lyrics(props: RouteComponentProps): React.ReactElement {
  const { history } = props;
  const [authState] = useAuthContext();

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

  function handleUpdateClick(lyricId: string): MouseEventHandler {
    return (): void => {
      history.push(`/admin/lyrics/edit/${lyricId}`);
    };
  }

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
      <h3>
        Lyrics
        {authState.isAuthenticated && (
          <Link to="/admin/lyrics/new">
            <PlusIcon />
          </Link>
        )}
      </h3>
      <div className="row">
        {lyrics.map(lyric => (
          <div key={lyric._id} className="col s12 m6">
            <div className="card" style={styles.card}>
              <span className="card-title">{lyric.name}</span>
              <div className="card-content">
                <p>{lyric.text}</p>
              </div>
              {authState.isAuthenticated && (
                <div className="card-action">
                  <Button handleClick={handleUpdateClick(lyric._id)}>
                    <i className="material-icons">edit</i>
                  </Button>
                  <Button isPrimary handleClick={handleDeleteClick(lyric._id)}>
                    <i className="material-icons">delete</i>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Lyrics;
