import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import { Gig } from '../../api/types';
import { fetchResources, deleteResource } from '../../api/utils';

function Gigs(): React.ReactElement {
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
      <h1>Gigs Admin</h1>
      <div>
        <Link to="/admin/gigs/new">New</Link>
        {gigs.map(gig => (
          <div key={gig._id}>
            <Link to={`gigs/edit/${gig._id}`}>{gig._id}</Link>
            <button type="button" onClick={handleDeleteClick(gig._id)}>
              Delete
            </button>
            <p>{gig.venue}</p>
            <p>{gig.address}</p>
            <p>{gig.date}</p>
            <p>{gig.hour}</p>
            <p>{gig.fbEvent}</p>
            <p>{gig.image}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gigs;
