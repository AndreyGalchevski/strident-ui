import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';

import { Lyric } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';
import { useMediaQuery } from '../../hooks/mediaQueryHook';
import Container from '../../styled/Container';
import { Card, CardContent, CardAction } from '../../styled/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Loader from '../../components/Loader';

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? '90vw' : '35vw',
  margin: 'auto',
}));

type MatchParams = {
  id: string;
};

const ManageLyric: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [lyric, setLyric] = useState<Lyric>({} as Lyric);
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  async function fetchLyric(): Promise<void> {
    setLoading(true);
    const resource = await fetchResource<Lyric>('lyrics', match.params.id);
    setLyric(resource);
    setLoading(false);
  }

  useEffect(() => {
    if (match.params.id) {
      fetchLyric();
    }
  }, []);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>): void {
    setLyric({ ...lyric, name: e.target.value });
  }

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setLyric({ ...lyric, text: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    let res = '';
    setLoading(true);
    if (match.params.id) {
      res = await updateResource<Lyric>('lyrics', match.params.id, lyric);
    } else {
      res = await createResource<Lyric>('lyrics', lyric);
    }
    setLoading(false);
    setShouldRedirect(true);
    window.alert(res);
  }

  const action = match.params.id ? 'Update' : 'Create';

  return (
    <>
      {shouldRedirect && <Redirect to="/lyrics" />}
      <Container>
        <h2>{action} Lyric</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input name="name" type="text" onChange={handleNameChange} value={lyric.name} />
                <TextArea name="text" onChange={handleTextChange} value={lyric.text} />
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

export default ManageLyric;
