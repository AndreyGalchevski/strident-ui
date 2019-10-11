import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { fetchResources, deleteResource } from '../api/utils';
import { Video } from '../api/types';
import { useAuthContext } from '../context/authContext';
import PlusIcon from '../components/PlusIcon';
import Button from '../components/Button';

const styles = {
  video: {
    marginBottom: '2em',
  },
  cardContent: {
    padding: 0,
  },
};

function Videos(props: RouteComponentProps): React.ReactElement {
  const { history } = props;

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
      const res = await deleteResource('videos', videoId);
      fetchVideos();
      window.alert(res);
    };
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h3>
        Videos
        {authState.isAuthenticated && (
          <Link to="/admin/videos/new">
            <PlusIcon />
          </Link>
        )}
      </h3>
      <div className="row">
        {videos.map(video => (
          <div key={video._id} className="col s12 m4" style={styles.video}>
            <div className="card">
              <div className="card-content" style={styles.cardContent}>
                <iframe
                  title={video.name}
                  src={video.url}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  frameBorder="0"
                  width="100%"
                  height="60%"
                />
              </div>
              {authState.isAuthenticated && (
                <div className="card-action">
                  <Button handleClick={handleUpdateClick(video._id)}>
                    <i className="material-icons">edit</i>
                  </Button>
                  <Button isPrimary handleClick={handleDeleteClick(video._id)}>
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

export default Videos;
