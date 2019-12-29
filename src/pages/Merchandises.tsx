import React, { FunctionComponent, useEffect, useState, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';

import { fetchResources, deleteResource } from '../api/utils';
import { Merchandise } from '../api/types';
import { useAuthContext } from '../context/authContext';
import { useMediaQuery } from '../hooks/mediaQueryHook';
import Container from '../styled/Container';
import { Masonry, MasonryBrick } from '../styled/Masonry';
import { Card, CardContent, CardTitle, CardImage, CardAction } from '../styled/Card';
import HalfwayTab from '../styled/HalfwayTab';
import Button from '../components/Button';
import Header from '../components/Header';
import Fab from '../components/Fab';
import Loader from '../components/Loader';

const PriceContainer = styled.p({
  display: 'flex',
  FlexDirectionProperty: 'row',
  justifyContent: 'center',
});

const EuroIcon = styled.i({
  fontSize: '18px',
  marginRight: '2px',
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
                <CardContent style={{ maxHeight: 184 }}>
                  <HalfwayTab
                    href={merchandise.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ bottom: 156 }}
                  >
                    <i className="material-icons" style={{ color: 'black', marginTop: 8 }}>
                      shopping_cart
                    </i>
                  </HalfwayTab>
                  <CardTitle>{merchandise.name}</CardTitle>
                  <p>{merchandise.type}</p>
                  <PriceContainer>
                    <EuroIcon className="material-icons">euro_symbol</EuroIcon>
                    <span> {merchandise.price} EUR</span>
                  </PriceContainer>
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(merchandise.id)}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(merchandise.id)}>
                      <i className="material-icons">delete</i>
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
