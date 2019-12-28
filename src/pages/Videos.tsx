import React, { FunctionComponent, useState, useEffect, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { fetchResources, deleteResource } from '../api/utils';
import { Video } from '../api/types';
import { useAuthContext } from '../context/authContext';
import Container from '../styled/Container';
import { Card, CardContent, CardAction } from '../styled/Card';
import Header from '../components/Header';
import Button from '../components/Button';
import Fab from '../components/Fab';
import Loader from '../components/Loader';

const Videos: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [authState] = useAuthContext();

  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchVideos(): Promise<void> {
    setLoading(true);
    const resources = await fetchResources<Video>('videos');
    setVideos(resources);
    setLoading(false);
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  function handleUpdateClick(videoId: string): MouseEventHandler {
    return (): void => {
      history.push(`/admin/videos/edit/${videoId}`);
    };
  }

  function handleDeleteClick(videoId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm('Are you sure you want to delete the video?')) {
        const res = await deleteResource('videos', videoId);
        fetchVideos();
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Videos" />
      {authState.isAuthenticated && <Fab url="/admin/videos/new" />}
      <Loader isLoading={isLoading}>
        <div className="row">
          {videos.map(video => (
            <div key={video.id} className="col s12 m4" style={{ marginBottom: '2em' }}>
              <Card>
                <CardContent style={{ padding: 0 }}>
                  <iframe
                    title={video.name}
                    src={video.url}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    frameBorder="0"
                    width="100%"
                    height="60%"
                  />
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(video.id)}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(video.id)}>
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

export default Videos;
