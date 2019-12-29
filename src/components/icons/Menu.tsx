import React, { CSSProperties, FunctionComponent } from 'react';

import { COLORS } from '../../utils/constants';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  style?: CSSProperties;
}

const MenuIcon: FunctionComponent<Props> = ({
  width = 24,
  height = 24,
  color = COLORS.WHITE,
  style = {},
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={style}
  >
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill={color} />
  </svg>
);

export default MenuIcon;
