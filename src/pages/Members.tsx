import React, { useState, useEffect } from 'react';

import { Member } from '../api/types';
import { fetchResources } from '../api/utils';

const styles = {
  card: {
    // height: '20em',
    // width: '10em',
  },
  cardImage: {
    // height: '80%',
    // width: '80%',
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
                <img src={member.image} alt="" style={styles.cardImage} />
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
