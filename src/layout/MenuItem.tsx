import React, { FunctionComponent, CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';

import { COLORS } from '../utils/constants';

interface MenuItemProps {
  path: string;
  text: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({ path, text, onClick, style = {} }) => (
  <NavLink
    exact
    to={path}
    style={style}
    activeStyle={{ fontSize: 16, color: COLORS.RED }}
    onClick={onClick}
  >
    {text}
  </NavLink>
);

export default MenuItem;
