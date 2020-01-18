import React, { FunctionComponent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { useMediaQuery } from '../hooks/mediaQueryHook';
import Container from '../styled/Container';
import { Card, CardContent, CardTitle, CardAction } from '../styled/Card';
import ResponsiveText from '../styled/ResponsiveText';
import Header from '../components/Header';
import { COLORS, homeImages } from '../utils/constants';
import { fetchResources } from '../api/utils';
import { Gig } from '../api/types';

const BannerContainer = styled.div({
  marginBottom: 20,
});

const Banner = styled.img({
  height: '74vh',
  maxWidth: '90vw',
  boxShadow: `0 4px 8px 0 ${COLORS.BLACK}, 0 6px 20px 0 ${COLORS.BLACK}`,
});

const Home: FunctionComponent = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [latestGigs, setLatestGigs] = useState<Gig[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchLatestGigs(): Promise<void> {
    setLoading(true);
    const gigs = await fetchResources<Gig>('gigs');
    const lastThreeGigs = gigs.slice(0, 3);
    setLatestGigs(lastThreeGigs);
    setLoading(false);
  }

  useEffect(() => {
    fetchLatestGigs();
  }, []);

  return (
    <Container>
      <Header title="Home" />
      <BannerContainer>
        <picture>
          <source
            media="(max-width: 785px)"
            srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572275145/strident/app/march-of-plague-banner-high-ng.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 785px)"
            srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572274125/strident/app/march-of-plague-banner-high.jpg"
            type="image/jpeg"
          />
          <source
            media="(min-width: 786px)"
            srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572275146/strident/app/march-of-plague-banner-wide-ng.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 786px)"
            srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572274888/strident/app/march-of-plague-banner-wide.jpg"
            type="image/jpeg"
          />
          <Banner
            src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572274125/strident/app/march-of-plague-banner-high.jpg"
            alt="New Album banner"
          />
        </picture>
      </BannerContainer>
      <div className="row">
        <div className="col s12 m6">
          <Card>
            <CardContent>
              <CardTitle>About</CardTitle>
              <ResponsiveText isMobile={isMobile}>
                Strident is a thrash metal band formed in 2004 in the ancient city of Be`er Sheva
                (Israel). Starting from playing cover versions of such famous groups as Iron Maiden,
                AC / DC, etc and having come a long way, they found their style on the Israeli metal
                scene
              </ResponsiveText>
            </CardContent>
            <CardAction>
              <Link to="about" style={{ color: COLORS.WHITE }}>
                Read more
              </Link>
            </CardAction>
          </Card>
        </div>
        <div className="col s12 m6">
          <Card>
            <CardContent style={{ padding: 0 }}>
              <iframe
                title="STRIDENT - No Faith No War"
                width="100%"
                height="60%"
                src="https://www.youtube.com/embed/UkvlRmq62io"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </CardContent>
            <CardAction>
              <Link to="/videos" style={{ color: COLORS.WHITE }}>
                More videos
              </Link>
            </CardAction>
          </Card>
        </div>
      </div>
      <ImageGallery items={homeImages} />
      <div className="row" style={{ marginTop: '2em' }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="col s12 m6">
            <Card>
              <CardContent>
                <CardTitle>Gigs</CardTitle>
                {latestGigs.map(gig => (
                  <div key={gig.id}>
                    <p>{new Date(gig.date).toDateString()}</p>
                    <p>
                      {gig.name} - {gig.venue}
                    </p>
                    <p>{gig.city}</p>
                    <hr />
                  </div>
                ))}
              </CardContent>
              <CardAction>
                <Link to="/gigs" style={{ color: COLORS.WHITE }}>
                  More gigs
                </Link>
              </CardAction>
            </Card>
          </div>
        )}
        <div className="col s12 m6">
          <Card>
            <CardContent style={{ padding: 0 }}>
              <iframe
                title="Strident Spotify page"
                src="https://open.spotify.com/embed/artist/1iLO8tqlkfiQMWf7JqaNE3"
                width="100%"
                height="60%"
                frameBorder="0"
                allow="encrypted-media"
              />
            </CardContent>
            <CardAction>
              <Link to="/songs" style={{ color: COLORS.WHITE }}>
                More songs
              </Link>
            </CardAction>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Home;
