import React, { FunctionComponent } from 'react';

const styles = {
  leftImage: {
    marginRight: '10px',
  },
  rightImage: {
    marginLeft: '10px',
  },
  divider: {
    paddingTop: '1.5vh',
    paddingBottom: '1.5vh',
  },
};

export interface Props {
  title: string;
}

const Header: FunctionComponent<Props> = ({ title }) => {
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
      <div className="hide-on-med-and-down" style={styles.divider}>
        {' '}
      </div>
    </div>
  );
};

export default Header;
