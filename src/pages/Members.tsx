import React, { useState, useEffect, MouseEventHandler } from 'react';

import { Link, RouteComponentProps } from 'react-router-dom';
import { Member } from '../api/types';
import { fetchResources, deleteResource } from '../api/utils';
import { LIGHT_COLOR } from '../utils/constants';
import { useAuthContext } from '../context/authContext';
import PlusIcon from '../components/PlusIcon';
import Button from '../components/Button';

const styles = {
  card: {
    boxShadow: `0 4px 8px 0 ${LIGHT_COLOR}, 0 6px 20px 0 ${LIGHT_COLOR}`,
  },
};

function Members(props: RouteComponentProps): React.ReactElement {
  const { history } = props;

  const [authState] = useAuthContext();

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

  function handleUpdateClick(memberId: string): MouseEventHandler {
    return (): void => {
      history.push(`/admin/members/edit/${memberId}`);
    };
  }

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
      <h3>
        Members
        {authState.isAuthenticated && (
          <Link to="/admin/members/new">
            <PlusIcon />
          </Link>
        )}
      </h3>
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
              {authState.isAuthenticated && (
                <div className="card-action">
                  <Button handleClick={handleUpdateClick(member._id)}>
                    <i className="material-icons">edit</i>
                  </Button>
                  <Button isPrimary handleClick={handleDeleteClick(member._id)}>
                    <i className="material-icons">delete</i>
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Members;
