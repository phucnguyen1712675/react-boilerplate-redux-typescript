import styled from '@emotion/styled/macro';

const ErrorMessage = styled.span`
  font-size: 0.875rem;
  font-style: italic;
  color: ${(p) => p.theme.palette.error.main};
`;

export default ErrorMessage;
