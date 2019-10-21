import React, { useEffect, useState, MouseEventHandler } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { fetchResources, deleteResource } from '../api/utils';
import { Merchandise } from '../api/types';
import { useAuthContext } from '../context/authContext';
import Button from '../components/Button';
import { PRIMARY_COLOR } from '../utils/constants';
import Header from '../components/Header';
import Fab from '../components/Fab';

const styles = {
  card: {
    boxShadow: `0 4px 8px 0 ${PRIMARY_COLOR}, 0 6px 20px 0 ${PRIMARY_COLOR}`,
  },
};

function Merchandises(props: RouteComponentProps): React.ReactElement {
  const { history } = props;

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
        const res = await deleteResource('songs', merchandiseId);
        fetchMerchandises();
        window.alert(res);
      }
    };
  }

  return (
    <section>
      <Header title="Merch" />
      {authState.isAuthenticated && <Fab url="/admin/merch/new" />}
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="row">
          {merchandises.map(merchandise => (
            <div
              key={merchandise.id}
              className={merchandises.length === 1 ? 'col s12 m4 push-m4' : 'col s12 m4'}
            >
              <div className="card">
                <div className="card-image">
                  <picture>
                    <source srcSet={merchandise.imageNG} type="image/webp" />
                    <source srcSet={merchandise.image} type="image/jpeg" />
                    <img src={merchandise.image} alt="" />
                  </picture>
                  <span className="card-title">{merchandise.name}</span>
                </div>
                <div className="card-content">
                  <p>{merchandise.type}</p>
                  <p>&#8362; {merchandise.price} ILS</p>
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
      )}
    </section>
  );
}

export default Merchandises;
