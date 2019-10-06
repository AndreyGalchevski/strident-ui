import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Gig } from '../../api/types';
import { fetchResource } from '../../api/utils';

function ManageGig(props: RouteComponentProps): React.ReactElement {
  const { match } = props;
  const [gig, setGig] = useState<Gig>({} as Gig);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVideo(): Promise<void> {
      setLoading(true);
      const resource = await fetchResource<Gig>('gigs', match.params.id);
      setGig(resource);
      setLoading(false);
    }

    fetchVideo();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h1>Manage Gig</h1>
      <div>
        <p>{gig._id}</p>
        <p>{gig.venue}</p>
        <p>{gig.address}</p>
        <p>{gig.date}</p>
        <p>{gig.hour}</p>
        <p>{gig.fbEvent}</p>
        <p>{gig.image}</p>
      </div>
    </section>
  );
}

export default ManageGig;
