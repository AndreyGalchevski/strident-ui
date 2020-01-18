import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';

import { Video } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';
import { formatDate } from '../../utils/general';
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

const ManageVideo: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [video, setVideo] = useState<Video>({
    id: '',
    name: '',
    url: '',
    date: new Date(),
  });
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    async function fetchVideo(): Promise<void> {
      setLoading(true);
      const resource = await fetchResource<Video>('videos', match.params.id);
      setVideo({ ...resource, date: new Date(resource.date) });
      setLoading(false);
    }

    if (match.params.id) {
      fetchVideo();
    }
  }, []);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setVideo({ ...video, [e.target.name]: e.target.value });
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement>): void {
    setVideo({ ...video, date: new Date(e.target.value) });
  }

  async function handleSaveClick(): Promise<void> {
    let res = '';
    setLoading(true);
    if (match.params.id) {
      res = await updateResource<Video>('videos', match.params.id, video);
    } else {
      res = await createResource<Video>('videos', video);
    }
    setLoading(false);
    setShouldRedirect(true);
    window.alert(res);
  }

  const action = match.params.id ? 'Update' : 'Create';

  return (
    <>
      {shouldRedirect && <Redirect to="/videos" />}
      <Container>
        <h2>{action} Video</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input name="name" type="text" onChange={handleFormChange} value={video.name} />
                <Input name="url" type="text" onChange={handleFormChange} value={video.url} />
                <Input
                  name="date"
                  type="date"
                  onChange={handleDateChange}
                  value={formatDate(video.date)}
                />
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

export default ManageVideo;
