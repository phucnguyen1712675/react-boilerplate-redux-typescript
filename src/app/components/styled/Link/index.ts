import styled from '@emotion/styled/macro';
import { Link as RouterLink } from 'react-router-dom';

const Link = styled(RouterLink)`
  color: ${(p) => p.theme.palette.primary.main};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }
`;

export default Link;
