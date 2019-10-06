import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Member } from '../../api/types';
import { fetchResource } from '../../api/utils';

function ManageMember(props: RouteComponentProps): React.ReactElement {
  const { match } = props;
  const [member, setMember] = useState<Member>({} as Member);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMember(): Promise<void> {
      setLoading(true);
      const resource = await fetchResource<Member>('members', match.params.id);
      setMember(resource);
      setLoading(false);
    }

    fetchMember();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h1>Manage Member</h1>
      <div>
        <p>{member._id}</p>
        <p>{member.name}</p>
        <p>{member.instrument}</p>
        <p>{member.info}</p>
        <p>{member.image}</p>
      </div>
    </section>
  );
}

export default ManageMember;
