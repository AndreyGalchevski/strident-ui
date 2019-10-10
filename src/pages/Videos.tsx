import React, { useState, useEffect } from 'react';

import { fetchResources } from '../api/utils';
import { Video } from '../api/types';

const styles = {
  video: {
    marginBottom: '2em',
  },
};

function Videos(): React.ReactElement {
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
      <h3>Videos</h3>
      <div className="row">
        {videos.map(video => (
          <div key={video._id} className="col s12 m6" style={styles.video}>
            <iframe
              className="embed"
              title={video.name}
              src={video.url}
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
              width="360"
              height="380"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Videos;
