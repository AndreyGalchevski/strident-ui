import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchResources } from '../api/utils';
import { Video } from '../api/types';
import { useAuthContext } from '../context/authContext';
import { ACCENT_COLOR } from '../utils/constants';

const styles = {
  video: {
    marginBottom: '2em',
  },
};

function Videos(): React.ReactElement {
  const [authState] = useAuthContext();

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
      <h3>
        Videos
        {authState.isAuthenticated && (
          <Link to="/admin/videos/new">
            <i className="material-icons" style={{ color: ACCENT_COLOR }}>
              add
            </i>
          </Link>
        )}
      </h3>
      <div className="row">
        {videos.map(video => (
          <div key={video._id} className="col s12 m4" style={styles.video}>
            {authState.isAuthenticated && (
              <div style={{ position: 'relative', float: 'right', right: '50px', top: '330px' }}>
                <Link
                  to={`/admin/videos/edit/${video._id}`}
                  style={{
                    display: 'block',
                    color: 'white',
                    backgroundColor: 'red',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                  }}
                >
                  <i className="material-icons">edit</i>
                </Link>
              </div>
            )}
            <iframe
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
