import React, { FunctionComponent, CSSProperties } from 'react';
import { PRIMARY_COLOR, LIGHT_COLOR } from '../utils/constants';

const styles = {
  footer: {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    height: '5vh',
    backgroundColor: PRIMARY_COLOR,
    color: LIGHT_COLOR,
    zIndex: '99',
  },
  footerContent: {
    marginTop: '1vh',
  },
  socialMediaLink: {
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
  },
  socialMediaIcon: {
    fontSize: '20px',
    color: LIGHT_COLOR,
  },
};

const Footer: FunctionComponent = () => {
  return (
    <footer style={styles.footer as CSSProperties}>
      <p style={styles.footerContent}>
        <span>
          <a
            href="https://www.facebook.com/stridentthrash"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialMediaLink}
            aria-label="Follow Strident on Facebook"
          >
            <i className="fab fa-facebook-square" style={styles.socialMediaIcon} />
          </a>
          <a
            href="https://www.instagram.com/strident.thrash"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialMediaLink}
            aria-label="Follow Strident on Instagram"
          >
            <i className="fab fa-instagram" style={styles.socialMediaIcon} />
          </a>
          <a
            href="https://stridentthrash.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialMediaLink}
            aria-label="Follow Strident on Bandcamp"
          >
            <i className="fab fa-bandcamp" style={styles.socialMediaIcon} />
          </a>
          <a
            href="https://www.youtube.com/user/MrThrashmaster"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialMediaLink}
            aria-label="Watch Strident on Youtube"
          >
            <i className="fab fa-youtube" style={styles.socialMediaIcon} />
          </a>
          <a
            href="https://open.spotify.com/artist/1iLO8tqlkfiQMWf7JqaNE3"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialMediaLink}
            aria-label="Listen to Strident on Spotify"
          >
            <i className="fab fa-spotify" style={styles.socialMediaIcon} />
          </a>
        </span>
      </p>
    </footer>
  );
};

export default Footer;
