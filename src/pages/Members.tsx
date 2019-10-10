import React, { useState, useEffect } from 'react';

import { Member } from '../api/types';
import { fetchResources } from '../api/utils';
import { LIGHT_COLOR } from '../utils/constants';

const styles = {
  card: {
    boxShadow: `0 4px 8px 0 ${LIGHT_COLOR}, 0 6px 20px 0 ${LIGHT_COLOR}`,
  },
};

function Members(): React.ReactElement {
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
      <h3>Members</h3>
      <div className="row">
        {members.map(member => (
          <div key={member._id} className="col s12 m3">
            <div className="card" style={styles.card}>
              <div className="card-image">
                <img src={member.image} alt="" />
                <span className="card-title">{member.name}</span>
              </div>
              <div className="card-content">
                <p>{member.instrument}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Members;
