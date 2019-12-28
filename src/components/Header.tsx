import React, { FunctionComponent } from 'react';

import styled from '@emotion/styled';

const LeftIcon = styled.img({
  marginRight: 10,
});

const RightIcon = styled.img({
  marginLeft: 10,
});

const Divider = styled.div({
  paddingTop: '1.5vh',
  paddingBottom: '1.5vh',
});

export interface Props {
  title: string;
}

const Header: FunctionComponent<Props> = ({ title }) => {
  return (
    <div>
      <h3 className="hide-on-med-and-up">
        <LeftIcon
          src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570908405/strident/icons/20191012_210223__01.png"
          alt=""
        />
        {title}
        <RightIcon
          src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570903384/strident/icons/20191012_210223.png"
          alt=""
        />
      </h3>
      <Divider className="hide-on-med-and-down"> </Divider>
    </div>
  );
};

export default Header;
