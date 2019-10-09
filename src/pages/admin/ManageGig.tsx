import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Gig } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';

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

    if (match.params.id) {
      fetchVideo();
    }
  }, []);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setGig({ ...gig, [e.target.name]: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    let res = '';
    setLoading(true);
    if (match.params.id) {
      res = await updateResource<Gig>('gigs', match.params.id, gig);
    } else {
      res = await createResource<Gig>('gigs', gig);
      setGig({} as Gig);
    }
    setLoading(false);
    window.alert(res);
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      {match.params.id ? <h1>Update Gig</h1> : <h1>Create Gig</h1>}
      <div>
        <div>
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            onChange={handleFormChange}
            value={gig.venue}
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleFormChange}
            value={gig.address}
          />
        </div>
        <div>
          <input
            type="text"
            name="date"
            placeholder="Date"
            onChange={handleFormChange}
            value={gig.date}
          />
        </div>
        <div>
          <input
            type="text"
            name="hour"
            placeholder="Hour"
            onChange={handleFormChange}
            value={gig.hour}
          />
        </div>
        <div>
          <input
            type="text"
            name="fbEvent"
            placeholder="Facebook Event URL"
            onChange={handleFormChange}
            value={gig.fbEvent}
          />
        </div>
        <div>
          <input
            type="text"
            name="image"
            placeholder="Image"
            onChange={handleFormChange}
            value={gig.image}
          />
        </div>
        <button type="button" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </section>
  );
}

export default ManageGig;
