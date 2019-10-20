import React, { useEffect, useState, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { fetchResources, deleteResource } from '../api/utils';
import { Lyric } from '../api/types';
import { PRIMARY_COLOR } from '../utils/constants';
import { useAuthContext } from '../context/authContext';
import Button from '../components/Button';
import { useMediaQuery } from '../hooks/mediaQueryHook';
import Header from '../components/Header';
import Fab from '../components/Fab';

const styles = {
  lyricsContainer: (isWideScreen: boolean): any => ({
    margin: 'auto',
    maxWidth: '1080px',
    columnCount: isWideScreen ? '2' : '1',
  }),
  lyric: {
    display: 'inline-block',
    width: '100%',
    padding: '2vh',
  },
  card: {
    paddingTop: '2em',
    boxShadow: `0 4px 8px 0 ${PRIMARY_COLOR}, 0 6px 20px 0 ${PRIMARY_COLOR}`,
    paddingBottom: '1em',
  },
  cardContent: {
    padding: '0',
  },
  text: {
    fontFamily: '"Special Elite", cursive',
    fontSize: '13px',
  },
};

function Lyrics(props: RouteComponentProps): React.ReactElement {
  const { history } = props;
  const [authState] = useAuthContext();
  const isWideScreen = useMediaQuery('(min-width: 1024px)');

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
      if (window.confirm('Are you sure you want to delete the lyric?')) {
        const res = await deleteResource('lyrics', lyricId);
        fetchLyrics();
        window.alert(res);
      }
    };
  }

  return (
    <section>
      <Header title="Lyrics" />
      {authState.isAuthenticated && <Fab url="/admin/lyrics/new" />}
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div style={styles.lyricsContainer(isWideScreen)} className="lyrics-container">
          {lyrics.map(lyric => (
            <div key={lyric.id} style={styles.lyric}>
              <div className="card" style={styles.card}>
                <span className="card-title">{lyric.name}</span>
                <div className="card-content" style={styles.cardContent}>
                  <pre style={styles.text}>{lyric.text}</pre>
                </div>
                {authState.isAuthenticated && (
                  <div className="card-action">
                    <Button handleClick={handleUpdateClick(lyric.id)}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(lyric.id)}>
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

export default Lyrics;
