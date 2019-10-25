import React, { ReactElement, CSSProperties } from 'react';
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
    fontSize: '18px',
    color: LIGHT_COLOR,
  },
};

function Footer(): ReactElement {
  const currentYear = new Date().getFullYear();

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
            aria-label="Foolow Strident on Bandcamp"
          >
            <i className="fab fa-bandcamp" style={styles.socialMediaIcon} />
          </a>
        </span>
        {/* <span>&#169; {currentYear} Strident</span> */}
      </p>
    </footer>
  );
}

export default Footer;
