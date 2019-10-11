import React, { ReactElement } from 'react';

import { ACCENT_COLOR } from '../utils/constants';

const styles = {
  color: ACCENT_COLOR,
};

function PlusIcon(): ReactElement {
  return (
    <i className="material-icons" style={styles}>
      add
    </i>
  );
}

export default PlusIcon;
