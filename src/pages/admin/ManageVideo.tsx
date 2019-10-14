import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import Calendar from 'react-calendar';

import { Video } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';
import Button from '../../components/Button';

type MatchParams = {
  id: string;
};

function ManageVideo(props: RouteComponentProps<MatchParams>): React.ReactElement {
  const { match } = props;
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

  function handleDateChange(date: Date): void {
    setVideo({ ...video, date });
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
    setShouldRedirect(true);
    window.alert(res);
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      {shouldRedirect && <Redirect to="/videos" />}
      <section>
        {match.params.id ? <h3>Update Video</h3> : <h3>Create Video</h3>}
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <div className="card">
              <div className="card-content">
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
                <Calendar value={video.date} onChange={handleDateChange} />
              </div>
              <div className="card-action">
                <Button handleClick={handleSaveClick}>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ManageVideo;
