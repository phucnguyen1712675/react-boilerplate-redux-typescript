import { css } from '@emotion/react/macro';
import { StyleConstants } from 'enums';
import { Theme } from 'types';

const globalStyles = (theme: Theme) => css`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    padding-top: ${StyleConstants.NAV_BAR_HEIGHT};
    background-color: ${theme.background};
  }
  body.fontLoaded {
    font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  p,
  label {
    line-height: 1.5em;
  }
  input,
  select,
  button {
    font-family: inherit;
    font-size: inherit;
  }
  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default globalStyles;
