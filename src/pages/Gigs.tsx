import React, { useState, useEffect, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Gig } from '../api/types';
import { fetchResources, deleteResource } from '../api/utils';
import { PRIMARY_COLOR } from '../utils/constants';
import { useAuthContext } from '../context/authContext';
import Button from '../components/Button';
import Header from '../components/Header';

const styles = {
  card: {
    boxShadow: `0 4px 8px 0 ${PRIMARY_COLOR}, 0 6px 20px 0 ${PRIMARY_COLOR}`,
  },
};

function Gigs(props: RouteComponentProps): React.ReactElement {
  const { history } = props;

  const [authState] = useAuthContext();

  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchGigs(): Promise<void> {
    setLoading(true);
    const resources = await fetchResources<Gig>('gigs');
    setGigs(resources);
    setLoading(false);
  }

  useEffect(() => {
    fetchGigs();
  }, []);

  function handleUpdateClick(gigId: string): MouseEventHandler {
    return (): void => {
      history.push(`/admin/gigs/edit/${gigId}`);
    };
  }

  function handleDeleteClick(gigId: string): MouseEventHandler {
    return async (): Promise<void> => {
      const res = await deleteResource('gigs', gigId);
      fetchGigs();
      window.alert(res);
    };
  }

  return (
    <section>
      <Header
        title="Gigs"
        isAuthenticated={authState.isAuthenticated}
        adminPath="/admin/gigs/new"
      />
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="row">
          {gigs.map(gig => (
            <div key={gig._id} className="col s12 m4">
              <div className="card" style={styles.card}>
                <div className="card-image">
                  <img src={gig.image} alt="" />
                  <a
                    href={gig.fbEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-floating halfway-fab waves-effect waves-light white"
                  >
                    <img
                      src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570909046/strident/icons/facebook.png"
                      alt=""
                    />
                  </a>
                </div>
                <div className="card-content">
                  <p>{gig.venue}</p>
                  <p>{gig.address}</p>
                  <p>{gig.date}</p>
                  <p>{gig.hour}</p>
                </div>
                {authState.isAuthenticated && (
                  <div className="card-action">
                    <Button handleClick={handleUpdateClick(gig._id)}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(gig._id)}>
                      <i className="material-icons">delete</i>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Gigs;
