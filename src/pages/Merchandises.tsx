import React, { FunctionComponent, useEffect, useState, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';

import { fetchResources, deleteResource } from '../api/utils';
import { Merchandise } from '../api/types';
import { useAuthContext } from '../context/authContext';
import useMediaQuery from '../hooks/useMediaQuery';
import Container from '../styled/Container';
import { Masonry, MasonryBrick } from '../styled/Masonry';
import { Card, CardContent, CardTitle, CardImage, CardAction } from '../styled/Card';
import HalfwayTab from '../styled/HalfwayTab';
import Button from '../components/Button';
import Header from '../components/Header';
import Fab from '../components/Fab';
import Loader from '../components/Loader';
import EditIcon from '../components/icons/Edit';
import DeleteIcon from '../components/icons/Delete';
import ShoppingCartIcon from '../components/icons/ShoppingCart';
import EuroIcon from '../components/icons/Euro';

const PriceContainer = styled.p({
  display: 'flex',
  FlexDirectionProperty: 'row',
  justifyContent: 'center',
});

const Merchandises: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [merchandises, setMerchandises] = useState<Merchandise[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchMerchandises(): Promise<void> {
    setLoading(true);
    const resources = await fetchResources<Merchandise>('merchandises');
    setMerchandises(resources);
    setLoading(false);
  }

  useEffect(() => {
    fetchMerchandises();
  }, []);

  function handleUpdateClick(merchandiseId: string): MouseEventHandler {
    return (): void => {
      history.push(`/admin/merch/edit/${merchandiseId}`);
    };
  }

  function handleDeleteClick(merchandiseId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm('Are you sure you want to delete the merch?')) {
        const res = await deleteResource('merchandises', merchandiseId);
        fetchMerchandises();
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Merch" />
      {authState.isAuthenticated && <Fab url="/admin/merch/new" />}
      <Loader isLoading={isLoading}>
        <Masonry isMobile={isMobile}>
          {merchandises.map(merchandise => (
            <MasonryBrick key={merchandise.id}>
              <Card>
                <div>
                  <picture>
                    <source srcSet={merchandise.imageNG} type="image/webp" />
                    <source srcSet={merchandise.image} type="image/jpeg" />
                    <CardImage src={merchandise.image} alt="" />
                  </picture>
                </div>
                <HalfwayTab
                  href={merchandise.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ bottom: 156 }}
                >
                  <ShoppingCartIcon style={{ marginTop: 8 }} />
                </HalfwayTab>
                <CardContent style={{ maxHeight: 184 }}>
                  <CardTitle>{merchandise.name}</CardTitle>
                  <p>{merchandise.type}</p>
                  <PriceContainer>
                    <EuroIcon style={{ marginRight: 4 }} />
                    <span> {merchandise.price} EUR</span>
                  </PriceContainer>
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(merchandise.id)}>
                      <EditIcon />
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(merchandise.id)}>
                      <DeleteIcon />
                    </Button>
                  </CardAction>
                )}
              </Card>
            </MasonryBrick>
          ))}
        </Masonry>
      </Loader>
    </Container>
  );
};

export default Merchandises;
