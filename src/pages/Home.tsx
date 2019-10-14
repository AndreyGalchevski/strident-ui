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

function Home(): ReactElement {
  const images = [
    {
      original:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/v1570914457/strident/home/14560001_305560699829313_190576764753653116_o.jpg',
      thumbnail:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/c_thumb,w_200,g_face/v1570914457/strident/home/14560001_305560699829313_190576764753653116_o.jpg',
    },
    {
      original:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/v1570914452/strident/home/14707023_306805919706290_6733490491524521498_o.jpg',
      thumbnail:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/c_thumb,w_200,g_face/v1570914452/strident/home/14707023_306805919706290_6733490491524521498_o.jpg',
    },
    {
      original:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/v1570914449/strident/home/69207337_501988200599418_1324525320895725568_o.jpg',
      thumbnail:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/c_thumb,w_200,g_face/v1570914449/strident/home/69207337_501988200599418_1324525320895725568_o.jpg',
    },
    {
      original:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/v1570914452/strident/home/14633299_306806073039608_1412137420161929612_o.jpg',
      thumbnail:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/c_thumb,w_200,g_face/v1570914452/strident/home/14633299_306806073039608_1412137420161929612_o.jpg',
    },
    {
      original:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/v1570914455/strident/home/14853019_305560963162620_4415895129920502907_o.jpg',
      thumbnail:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/c_thumb,w_200,g_face/v1570914455/strident/home/14853019_305560963162620_4415895129920502907_o.jpg',
    },
    {
      original:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/v1570914457/strident/home/68511355_184485419239032_1400362765327007744_o.jpg',
      thumbnail:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/c_thumb,w_200,g_face/v1570914457/strident/home/68511355_184485419239032_1400362765327007744_o.jpg',
    },
    {
      original:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/v1570914457/strident/home/14753198_305561073162609_8668462644089060614_o.jpg',
      thumbnail:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/c_thumb,w_200,g_face/v1570914457/strident/home/14753198_305561073162609_8668462644089060614_o.jpg',
    },
    {
      original:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/v1570914451/strident/home/14615874_306806359706246_3238184304545373077_o.jpg',
      thumbnail:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/c_thumb,w_200,g_face/v1570914451/strident/home/14615874_306806359706246_3238184304545373077_o.jpg',
    },
    {
      original:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/v1570914456/strident/home/14853237_306807193039496_7866568446602456550_o.jpg',
      thumbnail:
        'https://res.cloudinary.com/dqvimfd8b/image/upload/c_thumb,w_200,g_face/v1570914456/strident/home/14853237_306807193039496_7866568446602456550_o.jpg',
    },
  ];

  return (
    <section>
      <Header title="Home" />
      <ImageGallery items={images} />
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
