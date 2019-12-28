import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import { COLORS } from '../utils/constants';

const Container = styled.footer({
  position: 'fixed',
  bottom: '0',
  width: '100%',
  height: '5vh',
  backgroundColor: COLORS.BLACK,
  color: COLORS.WHITE,
  zIndex: 99,
});

const Content = styled.p({
  marginTop: '1vh',
});

const SocialMediaLink = styled.a({
  paddingLeft: '0.5em',
  paddingRight: '0.5em',
});

const SocialMediaIcon = styled.i({
  fontSize: '20px',
  color: COLORS.WHITE,
});

const Footer: FunctionComponent = () => {
  return (
    <Container>
      <Content>
        <span>
          <SocialMediaLink
            href="https://www.facebook.com/stridentthrash"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Strident on Facebook"
          >
            <SocialMediaIcon className="fab fa-facebook-square" />
          </SocialMediaLink>
          <SocialMediaLink
            href="https://www.instagram.com/strident.thrash"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Strident on Instagram"
          >
            <SocialMediaIcon className="fab fa-instagram" />
          </SocialMediaLink>
          <SocialMediaLink
            href="https://stridentthrash.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Strident on Bandcamp"
          >
            <SocialMediaIcon className="fab fa-bandcamp" />
          </SocialMediaLink>
          <SocialMediaLink
            href="https://www.youtube.com/user/MrThrashmaster"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Strident on Youtube"
          >
            <SocialMediaIcon className="fab fa-youtube" />
          </SocialMediaLink>
          <SocialMediaLink
            href="https://open.spotify.com/artist/1iLO8tqlkfiQMWf7JqaNE3"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Listen to Strident on Spotify"
          >
            <SocialMediaIcon className="fab fa-spotify" />
          </SocialMediaLink>
        </span>
      </Content>
    </Container>
  );
};

export default Footer;
