import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Video } from '../../api/types';
import { fetchResource } from '../../api/utils';

function ManageVideo(props: RouteComponentProps): React.ReactElement {
  const { match } = props;
  const [video, setVideo] = useState<Video>({} as Video);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideo(): Promise<void> {
      setLoading(true);
      const resource = await fetchResource<Video>('videos', match.params.id);
      setVideo(resource);
      setLoading(false);
    }

    fetchVideo();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h1>Manage Video</h1>
      <div>
        <p>{video._id}</p>
        <p>{video.name}</p>
        <p>{video.url}</p>
        <p>{video.date}</p>
      </div>
    </section>
  );
}

export default ManageVideo;
