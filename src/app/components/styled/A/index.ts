import styled from '@emotion/styled/macro';

const A = styled.a`
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

export default A;
