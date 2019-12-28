import styled from '@emotion/styled';

import { COLORS } from '../utils/constants';

export const Card = styled.div({
  position: 'relative',
  margin: '.5rem 0 1rem 0',
  boxShadow: `0 4px 8px 0 ${COLORS.BLACK}, 0 6px 20px 0 ${COLORS.BLACK}`,
  backgroundColor: COLORS.BLACK,
  color: COLORS.WHITE,
});

export const CardContent = styled.div({
  position: 'relative',
  padding: '24px',
});

export const CardTitle = styled.p({
  fontSize: '20px',
  lineHeight: '32px',
  marginTop: 0,
  marginBottom: '8px',
  paddingTop: '8px',
});

export const CardAction = styled.div({
  position: 'relative',
  backgroundColor: 'inherit',
  borderTop: `1px solid ${COLORS.DARK_GREY}`,
  padding: '16px 24px',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 'inherit',
  borderBottomRightRadius: 'inherit',
});

export const CardImage = styled.img({
  display: 'block',
  borderRadius: '2px 2px 0 0',
  position: 'relative',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  width: '100%',
});
