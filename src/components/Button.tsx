import React, { ReactElement, MouseEventHandler } from 'react';
import { LIGHT_COLOR, ACCENT_COLOR } from '../utils/constants';

export interface ButtonProps {
  isPrimary?: boolean;
  handleClick: MouseEventHandler;
  children: string | ReactElement;
}

const styles = {
  marginRight: '1em',
  marginLeft: '1em',
};

function Button(props: ButtonProps): ReactElement {
  const { isPrimary, handleClick, children } = props;

  return (
    <button
      type="button"
      className="waves-effect waves-light btn"
      onClick={handleClick}
      style={{ ...styles, backgroundColor: isPrimary ? ACCENT_COLOR : LIGHT_COLOR }}
    >
      {children}
    </button>
  );
}

export default Button;
