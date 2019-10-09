import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { Video } from '../../api/types';
import { fetchResources, deleteResource } from '../../api/utils';

function VideosAdmin(): React.ReactElement {
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
      <h3>Videos Admin</h3>
      <div>
        <Link to="/admin/videos/new">New</Link>
        {videos.map(video => (
          <div key={video._id}>
            <Link to={`videos/edit/${video._id}`}>{video._id}</Link>
            <button type="button" onClick={handleDeleteClick(video._id)}>
              Delete
            </button>
            <p>{video.name}</p>
            <p>{video.url}</p>
            <p>{video.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VideosAdmin;
