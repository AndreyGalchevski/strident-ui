import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';

import { Song } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';
import { useMediaQuery } from '../../hooks/mediaQueryHook';
import Container from '../../styled/Container';
import { Card, CardContent, CardAction } from '../../styled/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? '90vw' : '35vw',
  margin: 'auto',
}));

type MatchParams = {
  id: string;
};

const ManageSong: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

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
      <Container>
        {match.params.id ? <h3>Update Song</h3> : <h3>Create Song</h3>}
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input name="name" type="text" onChange={handleFormChange} value={song.name} />
                <Input name="url" type="text" onChange={handleFormChange} value={song.url} />
                <Input name="album" type="text" onChange={handleFormChange} value={song.album} />
              </CardContent>
              <CardAction>
                <Button handleClick={handleSaveClick}>Save</Button>
              </CardAction>
            </Card>
          </Wrapper>
        </Loader>
      </Container>
    </>
  );
};

export default ManageSong;
