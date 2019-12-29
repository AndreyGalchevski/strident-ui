import React, { FunctionComponent, useEffect, useState, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';

import { fetchResources, deleteResource } from '../api/utils';
import { Lyric } from '../api/types';
import { useAuthContext } from '../context/authContext';
import { useMediaQuery } from '../hooks/mediaQueryHook';
import Container from '../styled/Container';
import { Masonry, MasonryBrick } from '../styled/Masonry';
import { Card, CardTitle, CardContent, CardAction } from '../styled/Card';
import Button from '../components/Button';
import Header from '../components/Header';
import Fab from '../components/Fab';
import Loader from '../components/Loader';

const Text = styled.pre({
  fontFamily: '"Special Elite", cursive',
  fontSize: '13px',
});

const Lyrics: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery('(max-width: 767px)');

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
    <Container>
      <Header title="Lyrics" />
      {authState.isAuthenticated && <Fab url="/admin/lyrics/new" />}
      <Loader isLoading={isLoading}>
        <Masonry isMobile={isMobile}>
          {lyrics.map(lyric => (
            <MasonryBrick key={lyric.id}>
              <Card>
                <CardTitle style={{ paddingTop: 20 }}>{lyric.name}</CardTitle>
                <CardContent style={{ paddingTop: 0 }}>
                  <Text>{lyric.text}</Text>
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(lyric.id)}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(lyric.id)}>
                      <i className="material-icons">delete</i>
                    </Button>
                  </CardAction>
                )}
              </Card>
            </MasonryBrick>
          ))}
        </Masonry>
      </Loader>
    </Container>
  );
};

export default Lyrics;
