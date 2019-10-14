import React, { useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';

import { Member } from '../../api/types';
import { fetchResource, updateResource, createResource } from '../../api/utils';
import Button from '../../components/Button';

type MatchParams = {
  id: string;
};

function ManageMember(props: RouteComponentProps<MatchParams>): React.ReactElement {
  const { match } = props;
  const [member, setMember] = useState<Member>({} as Member);
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    async function fetchMember(): Promise<void> {
      setLoading(true);
      const resource = await fetchResource<Member>('members', match.params.id);
      setMember(resource);
      setLoading(false);
    }

    if (match.params.id) {
      fetchMember();
    }
  }, []);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    let res = '';
    setLoading(true);
    if (match.params.id) {
      res = await updateResource<Member>('members', match.params.id, member);
    } else {
      res = await createResource<Member>('members', member);
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
      {shouldRedirect && <Redirect to="/members" />}
      <section>
        {match.params.id ? <h3>Update Member</h3> : <h3>Create Member</h3>}
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
                    value={member.name}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="instrument"
                    placeholder="Instrument"
                    onChange={handleFormChange}
                    value={member.instrument}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="info"
                    placeholder="Info"
                    onChange={handleFormChange}
                    value={member.info}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="image"
                    placeholder="Image"
                    onChange={handleFormChange}
                    value={member.image}
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

export default ManageMember;
