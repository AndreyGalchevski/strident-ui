import React, { FunctionComponent, useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface Props {
  url: string;
}

const Fab: FunctionComponent<Props> = ({ url }) => {
  useEffect(() => {
    const elems = document.querySelectorAll('.fixed-action-btn');
    // @ts-ignore
    M.FloatingActionButton.init(elems, {});
  }, []);

  return (
    <div className="fixed-action-btn" style={{ bottom: '50px' }}>
      <Link to={url} className="btn-floating btn-large red">
        <i className="large material-icons">add</i>
      </Link>
    </div>
  );
};

export default Fab;
