import React, { FunctionComponent, MouseEventHandler } from 'react';
import { ACCENT_COLOR, NEUTRAL_COLOR } from '../utils/constants';

const styles = {
  marginRight: '1em',
  marginLeft: '1em',
};

export interface Props {
  isPrimary?: boolean;
  handleClick: MouseEventHandler;
}

const Button: FunctionComponent<Props> = ({ isPrimary, handleClick, children }) => {
  return (
    <button
      type="button"
      className="waves-effect waves-light btn"
      onClick={handleClick}
      style={{ ...styles, backgroundColor: isPrimary ? ACCENT_COLOR : NEUTRAL_COLOR }}
    >
      {children}
    </button>
  );
};

export default Button;
