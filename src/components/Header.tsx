import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import PlusIcon from './PlusIcon';

export interface HeaderProps {
  title: string;
  isAuthenticated: boolean;
  adminPath: string;
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
  const { title, isAuthenticated, adminPath } = props;

  return (
    <h3>
      <img
        src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570903384/strident/20191012_210223__01.png"
        alt=""
        style={styles.leftImage}
      />
      {title}
      <img
        src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570903384/strident/20191012_210223.png"
        alt=""
        style={styles.rightImage}
      />
      {isAuthenticated && (
        <Link to={adminPath}>
          <PlusIcon />
        </Link>
      )}
    </h3>
  );
}

export default Header;
