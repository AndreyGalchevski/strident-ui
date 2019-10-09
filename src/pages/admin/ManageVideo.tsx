import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Video } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';

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

    if (match.params.id) {
      fetchVideo();
    }
  }, []);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setVideo({ ...video, [e.target.name]: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    let res = '';
    setLoading(true);
    if (match.params.id) {
      res = await updateResource<Video>('videos', match.params.id, video);
    } else {
      res = await createResource<Video>('videos', video);
      setVideo({} as Video);
    }
    setLoading(false);
    window.alert(res);
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      {match.params.id ? <h1>Update Video</h1> : <h1>Create Video</h1>}
      <div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleFormChange}
            value={video.name}
          />
        </div>
        <div>
          <input
            type="text"
            name="url"
            placeholder="URL"
            onChange={handleFormChange}
            value={video.url}
          />
        </div>
        <div>
          <input
            type="text"
            name="date"
            placeholder="Date"
            onChange={handleFormChange}
            value={video.date}
          />
        </div>
        <button type="button" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </section>
  );
}

export default ManageVideo;
