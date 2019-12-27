import React, { FunctionComponent, useEffect, useState, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { fetchResources, deleteResource } from '../api/utils';
import { Merchandise } from '../api/types';
import { useAuthContext } from '../context/authContext';
import Button from '../components/Button';
import { PRIMARY_COLOR, LIGHT_COLOR } from '../utils/constants';
import Header from '../components/Header';
import Fab from '../components/Fab';
import Loader from '../components/Loader';

const styles = {
  container: {
    marginBottom: '17vh',
  },
  card: {
    boxShadow: `0 4px 8px 0 ${PRIMARY_COLOR}, 0 6px 20px 0 ${PRIMARY_COLOR}`,
    backgroundColor: PRIMARY_COLOR,
    color: LIGHT_COLOR,
  },
  price: {
    display: 'flex',
    FlexDirectionProperty: 'row',
    justifyContent: 'center',
  },
  euroIcon: {
    fontSize: '18px',
    marginRight: '2px',
  },
};

const Merchandises: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [authState] = useAuthContext();

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
    <section style={styles.container}>
      <Header title="Merch" />
      {authState.isAuthenticated && <Fab url="/admin/merch/new" />}
      <Loader isLoading={isLoading}>
        <div className="row">
          {merchandises.map(merchandise => (
            <div
              key={merchandise.id}
              className={merchandises.length === 1 ? 'col s12 m4 push-m4' : 'col s12 m4'}
            >
              <div className="card" style={styles.card}>
                <div className="card-image">
                  <picture>
                    <source srcSet={merchandise.imageNG} type="image/webp" />
                    <source srcSet={merchandise.image} type="image/jpeg" />
                    <img src={merchandise.image} alt="" />
                  </picture>
                  <a
                    href={merchandise.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-floating halfway-fab waves-effect waves-light white"
                  >
                    <i className="material-icons" style={{ color: 'black' }}>
                      shopping_cart
                    </i>
                  </a>
                </div>
                <div className="card-content">
                  <span className="card-title">{merchandise.name}</span>
                  <p>{merchandise.type}</p>
                  <p style={styles.price}>
                    <i className="material-icons" style={styles.euroIcon}>
                      euro_symbol
                    </i>
                    <span> {merchandise.price} EUR</span>
                  </p>
                </div>
                {authState.isAuthenticated && (
                  <div className="card-action">
                    <Button handleClick={handleUpdateClick(merchandise.id)}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(merchandise.id)}>
                      <i className="material-icons">delete</i>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Loader>
    </section>
  );
};

export default Merchandises;
