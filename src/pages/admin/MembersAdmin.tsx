import React, { useState, useEffect, MouseEventHandler } from 'react';

import { Link } from 'react-router-dom';
import { Member } from '../../api/types';
import { fetchResources, deleteResource } from '../../api/utils';

function MembersAdmin(): React.ReactElement {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchMembers(): Promise<void> {
    setLoading(true);
    const resources = await fetchResources<Member>('members');
    setMembers(resources);
    setLoading(false);
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  function handleDeleteClick(memberId: string): MouseEventHandler {
    return async (): Promise<void> => {
      const res = await deleteResource('members', memberId);
      fetchMembers();
      window.alert(res);
    };
  }

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <section>
      <h3>Members Admin</h3>
      <div>
        <Link to="/admin/members/new">New</Link>
        {members.map(member => (
          <div key={member._id}>
            <Link to={`members/edit/${member._id}`}>{member._id}</Link>
            <button type="button" onClick={handleDeleteClick(member._id)}>
              Delete
            </button>
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
