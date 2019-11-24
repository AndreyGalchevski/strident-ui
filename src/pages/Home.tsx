import React, { ReactElement, useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { PRIMARY_COLOR, LIGHT_COLOR } from '../utils/constants';
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

const styles = {
  container: {
    marginBottom: '18vh',
  },
  card: {
    boxShadow: `0 4px 8px 0 ${PRIMARY_COLOR}, 0 6px 20px 0 ${PRIMARY_COLOR}`,
    backgroundColor: PRIMARY_COLOR,
    color: LIGHT_COLOR,
    marginTop: '0',
    marginBottom: '1em',
  },
  cardEmbedContent: {
    padding: 0,
  },
  cardAction: {
    color: LIGHT_COLOR,
    margin: 0,
  },
  socialMediaLink: {
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  socialMediaIcon: {
    fontSize: '60px',
    color: PRIMARY_COLOR,
  },
  banner: {
    height: '74vh', 
    boxShadow: `0 4px 8px 0 ${PRIMARY_COLOR}, 0 6px 20px 0 ${PRIMARY_COLOR}` 
  }
};

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
    <section style={styles.container}>
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
            <img
              src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572274125/strident/app/march-of-plague-banner-high.jpg"
              alt="New Album banner"
              style={styles.banner}
            />
          </picture>
        </div>
      </div>
      <div className="row">
        <div className="col s12 m6">
          <div className="card" style={styles.card}>
            <div className="card-content">
              <p className="card-title">About</p>
              <p className="flow-text">
                Strident is a thrash metal band formed in 2004 in the ancient city of Be`er Sheva
                (Israel). Starting from playing cover versions of such famous groups as Iron Maiden,
                AC / DC, etc and having come a long way, they found their style on the Israeli metal
                scene
              </p>
            </div>
            <div className="card-action">
              <Link to="about" style={styles.cardAction}>
                Read more
              </Link>
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <div className="card" style={styles.card}>
            <div className="card-content" style={styles.cardEmbedContent}>
              <iframe
                title="March Of Plague (Official Release)"
                width="100%"
                height="60%"
                src="https://www.youtube.com/embed/kRaTaPfQi8U"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="card-action">
              <Link to="/videos" style={styles.cardAction}>
                More videos
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ImageGallery items={images} lazyLoad />
      <div className="row" style={{ marginTop: '2em' }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="col s12 m6">
            <div className="card" style={styles.card}>
              <div className="card-content">
                <div className="card-title">Gigs</div>
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
              </div>
              <div className="card-action">
                <Link to="/gigs" style={styles.cardAction}>
                  More gigs
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="col s12 m6">
          <div className="card" style={styles.card}>
            <div className="card-content" style={styles.cardEmbedContent}>
              <iframe
                title="Strident Spotify page"
                src="https://open.spotify.com/embed/artist/1iLO8tqlkfiQMWf7JqaNE3"
                width="100%"
                height="60%"
                frameBorder="0"
                allow="encrypted-media"
              />
            </div>
            <div className="card-action">
              <Link to="/songs" style={styles.cardAction}>
                More songs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
