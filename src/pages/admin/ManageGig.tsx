import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { Gig } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';
import Button from '../../components/Button';
import { formatDate, formatTime } from '../../utils/general';

type MatchParams = {
  id: string;
};

function ManageGig(props: RouteComponentProps<MatchParams>): React.ReactElement {
  const { match } = props;
  const [gig, setGig] = useState<Gig>({
    id: '',
    venue: '',
    address: '',
    date: new Date(),
    fbEvent: '',
    image: '',
  });
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    async function fetchVideo(): Promise<void> {
      setLoading(true);
      const resource = await fetchResource<Gig>('gigs', match.params.id);
      setGig({ ...resource, date: new Date(resource.date) });
      setLoading(false);
    }

    if (match.params.id) {
      fetchVideo();
    }
  }, []);

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setGig({ ...gig, [name]: value });
  }

  function handleDateInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    setGig({ ...gig, date: new Date(value) });
  }

  function handleTimeInputChange(e: ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target;
    setGig({ ...gig, date: new Date(`${formatDate(gig.date)} ${value}`) });
  }

  async function handleSaveClick(): Promise<void> {
    let res = '';
    setLoading(true);
    if (match.params.id) {
      res = await updateResource<Gig>('gigs', match.params.id, gig);
    } else {
      res = await createResource<Gig>('gigs', gig);
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
      {shouldRedirect && <Redirect to="/gigs" />}
      <section>
        {match.params.id ? <h3>Update Gig</h3> : <h3>Create Gig</h3>}
        <div className="row">
          <div className="col s12 m4 offset-m4">
            <div className="card">
              <div className="card-content">
                <div>
                  <input
                    type="text"
                    name="venue"
                    placeholder="Venue"
                    onChange={handleTextInputChange}
                    value={gig.venue}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleTextInputChange}
                    value={gig.address}
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="date"
                    placeholder="Date"
                    onChange={handleDateInputChange}
                    value={formatDate(gig.date)}
                  />
                </div>
                <div>
                  <input
                    type="time"
                    name="date"
                    placeholder="Time"
                    onChange={handleTimeInputChange}
                    value={formatTime(gig.date)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="fbEvent"
                    placeholder="Facebook Event URL"
                    onChange={handleTextInputChange}
                    value={gig.fbEvent}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image"
                    onChange={handleTextInputChange}
                    value={gig.image}
                  />
                </div>
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

export default ManageGig;
