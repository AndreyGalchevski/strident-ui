import React, { FunctionComponent, useState, useEffect, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Member } from '../api/types';
import { fetchResources, deleteResource } from '../api/utils';
import { useAuthContext } from '../context/authContext';
import Container from '../styled/Container';
import { Card, CardTitle, CardContent, CardImage, CardAction } from '../styled/Card';
import Button from '../components/Button';
import Header from '../components/Header';
import Fab from '../components/Fab';
import Loader from '../components/Loader';

const Members: FunctionComponent<RouteComponentProps> = ({ history }) => {
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
      if (window.confirm('Are you sure you want to delete the member?')) {
        const res = await deleteResource('members', memberId);
        fetchMembers();
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Members" />
      {authState.isAuthenticated && <Fab url="/admin/members/new" />}
      <Loader isLoading={isLoading}>
        <div className="row">
          {members.map(member => (
            <div key={member.id} className="col s12 m3">
              <Card>
                <div>
                  <picture>
                    <source srcSet={member.imageNG} type="image/webp" />
                    <source srcSet={member.image} type="image/jpeg" />
                    <CardImage src={member.image} alt="" />
                  </picture>
                </div>
                <CardContent>
                  <CardTitle>{member.name}</CardTitle>
                  <p>{member.instrument}</p>
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(member.id)}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(member.id)}>
                      <i className="material-icons">delete</i>
                    </Button>
                  </CardAction>
                )}
              </Card>
            </div>
          ))}
        </div>
      </Loader>
    </Container>
  );
};

export default Members;
