import React, { useState, useEffect } from 'react';

import { Member } from '../../api/types';
import { fetchResources } from '../../api/utils';

function MembersAdmin(): React.ReactElement {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMembers(): Promise<void> {
      setLoading(true);
      const resources = await fetchResources<Member>('members');
      setMembers(resources);
      setLoading(false);
    }

    fetchMembers();
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h1>Members Admin</h1>
      <div>
        {members.map(member => (
          <div key={member._id}>
            <p>{member._id}</p>
            <p>{member.name}</p>
            <p>{member.instrument}</p>
            <p>{member.info}</p>
            <p>{member.image}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MembersAdmin;
