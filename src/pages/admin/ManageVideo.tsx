import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { Video } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';
import { formatDate } from '../../utils/general';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';

type MatchParams = {
  id: string;
};

const styles = {
  container: {
    marginBottom: '4em',
  },
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

  return (
    <>
      {shouldRedirect && <Redirect to="/videos" />}
      <section style={styles.container}>
        {match.params.id ? <h3>Update Video</h3> : <h3>Create Video</h3>}
        <Loader isLoading={isLoading}>
          <div className="row">
            <div className="col s12 m4 offset-m4">
              <div className="card">
                <div className="card-content">
                  <Input
                    name="name"
                    type="text"
                    label="Name"
                    onChange={handleFormChange}
                    value={video.name}
                  />
                  <Input
                    name="url"
                    type="text"
                    label="URL"
                    onChange={handleFormChange}
                    value={video.url}
                  />
                  <Input
                    name="date"
                    type="date"
                    label="Date"
                    onChange={handleDateChange}
                    value={formatDate(video.date)}
                  />
                </div>
                <div className="card-action">
                  <Button handleClick={handleSaveClick}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        </Loader>
      </section>
    </>
  );
}

export default ManageVideo;
