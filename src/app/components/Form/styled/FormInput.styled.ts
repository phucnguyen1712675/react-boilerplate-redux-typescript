/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { Theme } from 'types';

export const inputWrapperStyle = css`
  position: relative;
  margin-top: 0.25rem;
`;

export const readOnlyInputStyle = (theme: Theme) => css`
  cursor: not-allowed;

  &:focus {
    border-color: ${theme.palette.grey[300]};
  }
`;

export const errorInputStyle = (theme: Theme) => css`
  border-color: ${theme.palette.error.main};

  &:focus {
    border-color: ${theme.palette.error.main};
    box-shadow: '0px 5px 10px ${theme.palette.error.main}';
  }
`;

export const baseInputStyle = (theme: Theme) => css`
  border-color: ${theme.palette.grey[300]};

  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: '0px 5px 10px ${theme.palette.primary.main}';
  }
`;
