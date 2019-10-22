import React, { useState, useEffect, ReactElement } from 'react';

export interface LoaderProps {
  isLoading: boolean;
  children: ReactElement;
}

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

function Loader(props: LoaderProps): ReactElement {
  const { isLoading, children } = props;
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
}

export default Loader;
