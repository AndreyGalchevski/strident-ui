import React, { useState, useEffect } from 'react';

import { fetchResources } from '../../api/utils';
import { Video } from '../../api/types';

function VideosAdmin(): React.ReactElement {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideos(): Promise<void> {
      setLoading(true);
      const resources = await fetchResources<Video>('videos');
      setVideos(resources);
      setLoading(false);
    }

    fetchVideos();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h1>Videos Admin</h1>
      <div>
        {videos.map(video => (
          <div key={video._id}>
            <p>{video._id}</p>
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
