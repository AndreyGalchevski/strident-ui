import React, { FunctionComponent, ReactNode, useState, useEffect } from 'react';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    FlexDirectionProperty: 'column',
    height: '70%',
  },
  image: {
    width: '70%',
  },
};

export interface Props {
  isLoading: boolean;
}

// @ts-ignore
const Loader: FunctionComponent<Props> = ({ isLoading, children }) => {
  const [shouldDisplayLoading, setDisplayLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplayLoading(false);
    }, 500);
  }, []);

  return isLoading || shouldDisplayLoading ? (
    <div style={styles.container}>
      <picture>
        <source
          srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571751521/strident/app/strident_rat_ng.webp"
          type="image/webp"
        />
        <source
          srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571751421/strident/app/strident_rat.gif"
          type="image/jpeg"
        />
        <img
          src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571751421/strident/app/strident_rat.gif"
          alt=""
          style={styles.image}
        />
      </picture>
    </div>
  ) : (
    children
  );
};

export default Loader;
