import React, { ReactElement } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import Header from '../components/Header';
import { PRIMARY_COLOR } from '../utils/constants';

const styles = {
  socialMediaLinksContainer: {
    marginBottom: '2em',
  },
  socialMediaLink: {
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  socialMediaIcon: {
    fontSize: '60px',
    color: PRIMARY_COLOR,
  },
};

const baseURL = 'https://res.cloudinary.com/dqvimfd8b/image/upload';

function Home(): ReactElement {
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

  return (
    <section>
      <Header title="Home" />
      <ImageGallery items={images} lazyLoad />
      <div>
        <h3>Follow Us On Social Media</h3>
        <div style={styles.socialMediaLinksContainer}>
          <a
            href="https://www.facebook.com/stridentthrash"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialMediaLink}
          >
            <i className="fab fa-facebook-square" style={styles.socialMediaIcon} />
          </a>
          <a
            href="https://www.instagram.com/strident.thrash"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialMediaLink}
          >
            <i className="fab fa-instagram" style={styles.socialMediaIcon} />
          </a>
          <a
            href="https://stridentthrash.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialMediaLink}
          >
            <i className="fab fa-bandcamp" style={styles.socialMediaIcon} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
