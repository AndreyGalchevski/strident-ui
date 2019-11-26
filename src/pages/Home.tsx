import React, { ReactElement, useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { PRIMARY_COLOR, LIGHT_COLOR, COLORS } from '../utils/constants';
import { fetchResources } from '../api/utils';
import { Gig } from '../api/types';

const baseURL = 'https://res.cloudinary.com/dqvimfd8b/image/upload';

const images = [
  {
    original: `${baseURL}/v1570914457/strident/home/1.jpg`,
    thumbnail: `${baseURL}/c_thumb,w_200,g_face/v1570914457/strident/home/1.jpg`,
    originalAlt: 'Strident performing in Kiev',
    thumbnailAlt: 'Strident performing in Kiev',
    imageSet: [
      {
        srcSet: `${baseURL}/v1571406645/strident/home/1_ng.webp`,
        type: 'image/webp',
      },
      {
        srcSet: `${baseURL}/v1570914457/strident/home/1.jpg`,
        media: 'image/jpeg',
      },
    ],
  },
  {
    original: `${baseURL}/v1570914452/strident/home/2.jpg`,
    thumbnail: `${baseURL}/c_thumb,w_200,g_face/v1570914452/strident/home/2.jpg`,
    originalAlt: 'Strident performing in Kiev',
    thumbnailAlt: 'Strident performing in Kiev',
    imageSet: [
      {
        srcSet: `${baseURL}/v1571410056/strident/home/2_ng.webp`,
        type: 'image/webp',
      },
      {
        srcSet: `${baseURL}/v1570914452/strident/home/2.jpg`,
        media: 'image/jpeg',
      },
    ],
  },
  {
    original: `${baseURL}/v1570914449/strident/home/3.jpg`,
    thumbnail: `${baseURL}/c_thumb,w_200,g_face/v1570914449/strident/home/3.jpg`,
    originalAlt: 'Strident performing in Tel Aviv',
    thumbnailAlt: 'Strident performing in Tel Aviv',
    imageSet: [
      {
        srcSet: `${baseURL}/v1571410056/strident/home/3_ng.webp`,
        type: 'image/webp',
      },
      {
        srcSet: `${baseURL}/v1570914449/strident/home/3.jpg`,
        media: 'image/jpeg',
      },
    ],
  },
  {
    original: `${baseURL}/v1570914452/strident/home/4.jpg`,
    thumbnail: `${baseURL}/c_thumb,w_200,g_face/v1570914452/strident/home/4.jpg`,
    originalAlt: 'Strident performing in Kiev',
    thumbnailAlt: 'Strident performing in Kiev',
    imageSet: [
      {
        srcSet: `${baseURL}/v1571410058/strident/home/4_ng.webp`,
        type: 'image/webp',
      },
      {
        srcSet: `${baseURL}/v1570914452/strident/home/4.jpg`,
        media: 'image/jpeg',
      },
    ],
  },
  {
    original: `${baseURL}/v1570914455/strident/home/5.jpg`,
    thumbnail: `${baseURL}/c_thumb,w_200,g_face/v1570914455/strident/home/5.jpg`,
    originalAlt: 'Strident performing in Kiev',
    thumbnailAlt: 'Strident performing in Kiev',
    imageSet: [
      {
        srcSet: `${baseURL}/v1571410055/strident/home/5_ng.webp`,
        type: 'image/webp',
      },
      {
        srcSet: `${baseURL}/v1570914455/strident/home/5.jpg`,
        media: 'image/jpeg',
      },
    ],
  },
  {
    original: `${baseURL}/v1570914457/strident/home/6.jpg`,
    thumbnail: `${baseURL}/c_thumb,w_200,g_face/v1570914457/strident/home/6.jpg`,
    originalAlt: 'Strident performing in Tel Aviv',
    thumbnailAlt: 'Strident performing in Tel Aviv',
    imageSet: [
      {
        srcSet: `${baseURL}/v1571410058/strident/home/6_ng.webp`,
        type: 'image/webp',
      },
      {
        srcSet: `${baseURL}/v1570914457/strident/home/6.jpg`,
        media: 'image/jpeg',
      },
    ],
  },
  {
    original: `${baseURL}/v1570914457/strident/home/7.jpg`,
    thumbnail: `${baseURL}/c_thumb,w_200,g_face/v1570914457/strident/home/7.jpg`,
    originalAlt: 'Strident performing in Kiev',
    thumbnailAlt: 'Strident performing in Kiev',
    imageSet: [
      {
        srcSet: `${baseURL}/v1571410057/strident/home/7_ng.webp`,
        type: 'image/webp',
      },
      {
        srcSet: `${baseURL}/v1570914457/strident/home/7.jpg`,
        media: 'image/jpeg',
      },
    ],
  },
  {
    original: `${baseURL}/v1570914451/strident/home/8.jpg`,
    thumbnail: `${baseURL}/c_thumb,w_200,g_face/v1570914451/strident/home/8.jpg`,
    originalAlt: 'Strident performing in Kiev',
    thumbnailAlt: 'Strident performing in Kiev',
    imageSet: [
      {
        srcSet: `${baseURL}/v1571410056/strident/home/8_ng.webp`,
        type: 'image/webp',
      },
      {
        srcSet: `${baseURL}/v1570914451/strident/home/8.jpg`,
        media: 'image/jpeg',
      },
    ],
  },
  {
    original: `${baseURL}/v1570914456/strident/home/9.jpg`,
    thumbnail: `${baseURL}/c_thumb,w_200,g_face/v1570914456/strident/home/9.jpg`,
    originalAlt: 'Strident performing in Kiev',
    thumbnailAlt: 'Strident performing in Kiev',
    imageSet: [
      {
        srcSet: `${baseURL}/v1571410058/strident/home/9_ng.webp`,
        type: 'image/webp',
      },
      {
        srcSet: `${baseURL}/v1570914456/strident/home/9.jpg`,
        media: 'image/jpeg',
      },
    ],
  },
  {
    original: `${baseURL}/v1570914452/strident/home/10.jpg`,
    thumbnail: `${baseURL}/c_thumb,w_200,g_face/v1570914452/strident/home/10.jpg`,
    originalAlt: 'Strident performing in Tel Aviv',
    thumbnailAlt: 'Strident performing in Tel Aviv',
    imageSet: [
      {
        srcSet: `${baseURL}/v1571410057/strident/home/10_ng.webp`,
        type: 'image/webp',
      },
      {
        srcSet: `${baseURL}/v1570914452/strident/home/10.jpg`,
        media: 'image/jpeg',
      },
    ],
  },
];

const Container = styled.section({
  marginBottom: '18vh',
});

const Card = styled.div({
  position: 'relative',
  margin: '.5rem 0 1rem 0',
  boxShadow: `0 4px 8px 0 ${COLORS.BLACK}, 0 6px 20px 0 ${COLORS.BLACK}`,
  backgroundColor: COLORS.BLACK,
  color: COLORS.WHITE,
  borderRadius: '20px',
});

const CardContent = styled.div({
  padding: '24px',
});

const CardTitle = styled.p({
  fontSize: '20px',
  lineHeight: '32px',
  marginBottom: '8px',
});

const CardAction = styled.div({
  position: 'relative',
  backgroundColor: 'inherit',
  borderTop: `1px solid ${COLORS.DARK_GREY}`,
  padding: '16px 24px',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 'inherit',
  borderBottomRightRadius: 'inherit',
});

const Banner = styled.img({
  height: '74vh',
  boxShadow: `0 4px 8px 0 ${COLORS.BLACK}, 0 6px 20px 0 ${COLORS.BLACK}`,
});

function Home(): ReactElement {
  const [latestGigs, setLatestGigs] = useState<Gig[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchGigs(): Promise<void> {
    setLoading(true);
    const gigs = await fetchResources<Gig>('gigs');
    const lastThreeGigs = gigs.slice(0, 3);
    setLatestGigs(lastThreeGigs);
    setLoading(false);
  }

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <Container>
      <Header title="Home" />
      <div className="row">
        <div className="col s12">
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
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6">
          <Card>
            <CardContent>
              <CardTitle>About</CardTitle>
              <p className="flow-text">
                Strident is a thrash metal band formed in 2004 in the ancient city of Be`er Sheva
                (Israel). Starting from playing cover versions of such famous groups as Iron Maiden,
                AC / DC, etc and having come a long way, they found their style on the Israeli metal
                scene
              </p>
            </CardContent>
            <CardAction>
              <Link to="about">Read more</Link>
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
              <Link to="/videos">More videos</Link>
            </CardAction>
          </Card>
        </div>
      </div>
      <ImageGallery items={images} lazyLoad />
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
                <Link to="/gigs">More gigs</Link>
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
              <Link to="/songs">More songs</Link>
            </CardAction>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default Home;
