import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

import { useMediaQuery } from '../hooks/mediaQueryHook';
import Header from '../components/Header';
import Container from '../styled/Container';
import { Card, CardContent } from '../styled/Card';

export const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? '90vw' : '70vw',
  margin: 'auto',
}));

const About: FunctionComponent = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <Container>
      <Header title="About" />
      <Wrapper isMobile={isMobile}>
        <Card>
          <CardContent>
            <p className="flow-text" style={{ marginTop: 0 }}>
              Strident is a thrash metal band formed in 2004 in the ancient city of Be`er Sheva
              (Israel). Starting from playing cover versions of such famous groups as Iron Maiden,
              AC / DC, etc and having come a long way, they found their style on the Israeli metal
              scene, despite the fact that in those years the scene was flooded with black metal and
              many hardcore bands. The group released its first album “On Aim” (2010), which raised
              the main problems of this world, on its own, thus challenging other popular styles.
              This album has become somewhat legendary, as it was the first full-length thrash metal
              album released in Israel back in the day. On 29 November 2019, their second album will
              out worldwide through Punishment 18 Records. The best thrash for lovers and
              connoisseurs of this style.
            </p>
            <p className="flow-text" style={{ marginTop: 0 }}>
              Thrash `till Death!
            </p>
          </CardContent>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default About;
