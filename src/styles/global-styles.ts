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
  button,
  textarea {
    font-family: inherit;
    font-size: inherit;
  }

  select {
    appearance: none;
    background-image: url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e');
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default globalStyles;
