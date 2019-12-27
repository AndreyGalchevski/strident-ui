import React, {
  FunctionComponent,
  useState,
  useEffect,
  MouseEventHandler,
  CSSProperties,
} from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Gig } from '../api/types';
import { fetchResources, deleteResource } from '../api/utils';
import { PRIMARY_COLOR, LIGHT_COLOR } from '../utils/constants';
import { useAuthContext } from '../context/authContext';
import { useMediaQuery } from '../hooks/mediaQueryHook';
import Button from '../components/Button';
import Header from '../components/Header';
import Fab from '../components/Fab';
import { formatDate, formatTime } from '../utils/general';
import Loader from '../components/Loader';

const styles = {
  container: {
    marginBottom: '17vh',
  },
  gigsContainer: (isMobile: boolean): CSSProperties => ({
    margin: 'auto',
    maxWidth: '1080px',
    columnCount: isMobile ? 1 : 2,
  }),
  gig: {
    display: 'inline-block',
    width: '100%',
    paddingRight: '2vh',
    paddingLeft: '2vh',
  },
  card: {
    boxShadow: `0 4px 8px 0 ${PRIMARY_COLOR}, 0 6px 20px 0 ${PRIMARY_COLOR}`,
    paddingBottom: '1em',
    backgroundColor: PRIMARY_COLOR,
    color: LIGHT_COLOR,
  },
  facebookIcon: {
    color: '#3b5998',
    fontSize: '20px',
    marginTop: '0.5em',
  },
  directionsIcon: {
    color: '#4A89F3',
    fontSize: '25px',
    marginTop: '-0.4em',
  },
};

const Gigs: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchGigs(): Promise<void> {
    setLoading(true);
    const resources = await fetchResources<Gig>('gigs');
    setGigs(resources);
    setLoading(false);
  }

  useEffect(() => {
    fetchGigs();
  }, []);

  function handleUpdateClick(gigId: string): MouseEventHandler {
    return (): void => {
      history.push(`/admin/gigs/edit/${gigId}`);
    };
  }

  function handleDeleteClick(gigId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm('Are you sure you want to delete the gig?')) {
        const res = await deleteResource('gigs', gigId);
        fetchGigs();
        window.alert(res);
      }
    };
  }

  return (
    <section style={styles.container}>
      <Header title="Gigs" />
      {authState.isAuthenticated && <Fab url="/admin/gigs/new" />}
      <Loader isLoading={isLoading}>
        <div style={styles.gigsContainer(isMobile)}>
          {gigs.map(gig => (
            <div key={gig.id} style={styles.gig}>
              <div className="card" style={styles.card}>
                <div className="card-image">
                  <picture>
                    <source srcSet={gig.imageNG} type="image/webp" />
                    <source srcSet={gig.image} type="image/jpeg" />
                    <img src={gig.image} alt="" />
                  </picture>
                  <a
                    href={gig.fbEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-floating halfway-fab waves-effect waves-light white"
                  >
                    <i className="fab fa-facebook-f" style={styles.facebookIcon} />
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${gig.venue} ${gig.city}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ paddingTop: '10px' }}
                    className="btn-floating halfway-fab waves-effect waves-light white left"
                  >
                    <i className="material-icons" style={styles.directionsIcon}>
                      directions
                    </i>
                  </a>
                </div>
                <div className="card-content">
                  <p>{gig.venue}</p>
                  <p>
                    {gig.address}, {gig.city}
                  </p>
                  <p>{formatDate(new Date(gig.date))}</p>
                  <p>{formatTime(new Date(gig.date))}</p>
                </div>
                {authState.isAuthenticated && (
                  <div className="card-action">
                    <Button handleClick={handleUpdateClick(gig.id)}>
                      <i className="material-icons">edit</i>
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(gig.id)}>
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

export default Gigs;
