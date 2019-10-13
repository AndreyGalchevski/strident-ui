import React, { ReactElement } from 'react';

export interface HeaderProps {
  title: string;
}

const styles = {
  leftImage: {
    marginRight: '10px',
  },
  rightImage: {
    marginLeft: '10px',
  },
};

function Header(props: HeaderProps): ReactElement {
  const { title } = props;

  return (
    <div>
      <h3 className="hide-on-med-and-up">
        <img
          src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570908405/strident/icons/20191012_210223__01.png"
          alt=""
          style={styles.leftImage}
        />
        {title}
        <img
          src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570903384/strident/icons/20191012_210223.png"
          alt=""
          style={styles.rightImage}
        />
      </h3>
      <h3 className="hide-on-med-and-down"> </h3>
    </div>
  );
}

export default Header;
