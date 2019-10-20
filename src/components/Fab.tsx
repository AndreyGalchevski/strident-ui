import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FloatingActionButton } from 'materialize-css';

export interface FabProps {
  url: string;
}

function Fab(props: FabProps): React.ReactElement {
  const { url } = props;

  useEffect(() => {
    const elems = document.querySelectorAll('.fixed-action-btn');
    FloatingActionButton.init(elems, {});
  }, []);

  return (
    <div className="fixed-action-btn">
      <Link to={url} className="btn-floating btn-large red">
        <i className="large material-icons">add</i>
      </Link>
    </div>
  );
}

export default Fab;
