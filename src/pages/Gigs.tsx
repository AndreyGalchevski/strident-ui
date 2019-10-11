import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { Gig } from '../api/types';
import { fetchResources, deleteResource } from '../api/utils';
import { LIGHT_COLOR } from '../utils/constants';
import { useAuthContext } from '../context/authContext';
import PlusIcon from '../components/PlusIcon';
import Button from '../components/Button';

const styles = {
  card: {
    boxShadow: `0 4px 8px 0 ${LIGHT_COLOR}, 0 6px 20px 0 ${LIGHT_COLOR}`,
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

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h3>
        Gigs
        {authState.isAuthenticated && (
          <Link to="/admin/gigs/new">
            <PlusIcon />
          </Link>
        )}
      </h3>
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
                  className="btn-floating halfway-fab waves-effect waves-light red"
                >
                  <i className="material-icons">share</i>
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
    </section>
  );
}

export default Gigs;
