import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import styled from '@emotion/styled';

import { Merchandise } from '../../api/types';
import { fetchResource, updateResource, createResource, uploadImage } from '../../api/utils';
import { useMediaQuery } from '../../hooks/mediaQueryHook';
import Container from '../../styled/Container';
import { Card, CardContent, CardAction } from '../../styled/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import FileInput from '../../components/FileInput';
import Loader from '../../components/Loader';

export const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? '90vw' : '35vw',
  margin: 'auto',
}));

type MatchParams = {
  id: string;
};

const ManageMerchandise: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [merchandise, setMerchandise] = useState<Merchandise>({
    id: '',
    name: '',
    type: '',
    price: 0,
    url: '',
    image: '',
    imageNG: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  async function fetchMerchandise(): Promise<void> {
    setLoading(true);
    const resource = await fetchResource<Merchandise>('merchandises', match.params.id);
    setMerchandise(resource);
    setLoading(false);
  }

  useEffect(() => {
    if (match.params.id) {
      fetchMerchandise();
    }
  }, []);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setMerchandise({ ...merchandise, [e.target.name]: e.target.value });
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
      image.append('merchandiseImage', selectedFile);
      try {
        const imageName = `${merchandise.name}-${merchandise.type}`;
        const result = await uploadImage('merchandises', imageName, image);
        imageURL = result.imageURL;
        ngImageURL = result.ngImageURL;
      } catch (error) {
        window.alert(error);
        return;
      }
    }

    if (imageURL && ngImageURL) {
      merchandise.image = imageURL;
      merchandise.imageNG = ngImageURL;
    }

    if (match.params.id) {
      res = await updateResource<Merchandise>('merchandises', match.params.id, merchandise);
    } else {
      res = await createResource<Merchandise>('merchandises', merchandise);
    }

    setLoading(false);
    setShouldRedirect(true);
    window.alert(res);
  }

  return (
    <>
      {shouldRedirect && <Redirect to="/merch" />}
      <Container>
        {match.params.id ? <h3>Update Merch</h3> : <h3>Create Merch</h3>}
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="name"
                  type="text"
                  label="Name"
                  onChange={handleFormChange}
                  value={merchandise.name}
                />
                <Input
                  name="type"
                  type="text"
                  label="Type"
                  onChange={handleFormChange}
                  value={merchandise.type}
                />
                <Input
                  name="price"
                  type="number"
                  label="Price"
                  onChange={handleFormChange}
                  value={merchandise.price}
                />
                <Input
                  name="url"
                  type="text"
                  label="URL"
                  onChange={handleFormChange}
                  value={merchandise.url}
                />
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

export default ManageMerchandise;
