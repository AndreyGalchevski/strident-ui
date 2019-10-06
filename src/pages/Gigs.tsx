import React, { useState, useEffect } from 'react';

import { Gig } from '../api/types';
import { fetchResources } from '../api/utils';

function Gigs(): React.ReactElement {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchGigs(): Promise<void> {
      setLoading(true);
      const resources = await fetchResources<Gig>('gigs');
      setGigs(resources);
      setLoading(false);
    }

    fetchGigs();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h1>Gigs</h1>
      <div>
        {gigs.map(gig => (
          <div key={gig._id}>
            <p>{gig._id}</p>
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
