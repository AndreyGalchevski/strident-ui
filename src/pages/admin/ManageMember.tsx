import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';

import { Member } from '../../api/types';
import { fetchResource, updateResource, createResource, uploadImage } from '../../api/utils';
import useMediaQuery from '../../hooks/useMediaQuery';
import Container from '../../styled/Container';
import { Card, CardContent, CardAction } from '../../styled/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FileInput from '../../components/FileInput';
import Loader from '../../components/Loader';

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? '90vw' : '35vw',
  margin: 'auto',
}));

type MatchParams = {
  id: string;
};

const ManageMember: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [member, setMember] = useState<Member>({
    id: '',
    name: '',
    instrument: '',
    info: '',
    image: '',
    imageNG: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  async function fetchMember(): Promise<void> {
    setLoading(true);
    const resource = await fetchResource<Member>('members', match.params.id);
    setMember(resource);
    setLoading(false);
  }

  useEffect(() => {
    if (match.params.id) {
      fetchMember();
    }
  }, []);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>): void {
    setSelectedFile(e.target.files[0]);
  }

  async function handleSaveClick(): Promise<void> {
    // TODO: validate
    setLoading(true);

    let res = '';
    let imageURL = '';
    let ngImageURL = '';

    if (selectedFile) {
      const image = new FormData();
      image.append('memberImage', selectedFile);
      try {
        const result = await uploadImage('members', member.name, image);
        imageURL = result.imageURL;
        ngImageURL = result.ngImageURL;
      } catch (error) {
        window.alert(error);
        return;
      }
    }

    if (imageURL && ngImageURL) {
      member.image = imageURL;
      member.imageNG = ngImageURL;
    }

    if (match.params.id) {
      res = await updateResource<Member>('members', match.params.id, member);
    } else {
      res = await createResource<Member>('members', member);
    }

    setLoading(false);
    setShouldRedirect(true);
    window.alert(res);
  }

  const action = match.params.id ? 'Update' : 'Create';

  return (
    <>
      {shouldRedirect && <Redirect to="/members" />}
      <Container>
        <h2>{action} Member</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input name="name" type="text" onChange={handleFormChange} value={member.name} />
                <Input
                  name="instrument"
                  type="text"
                  onChange={handleFormChange}
                  value={member.instrument}
                />
                <Input name="info" type="text" onChange={handleFormChange} value={member.info} />
                <FileInput onChange={handleImageChange} />
              </CardContent>
              <CardAction>
                <Button handleClick={handleSaveClick}>Save</Button>
              </CardAction>
            </Card>
          </Wrapper>
        </Loader>
      </Container>
    </>
  );
};

export default ManageMember;
