/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react/macro';
import { Theme } from 'types';

export const readOnlyStyle = (theme: Theme) => css`
  cursor: not-allowed;

  &:focus {
    border-color: ${theme.palette.grey[300]};
  }
`;

export const errorStyle = (theme: Theme) => css`
  border-color: ${theme.palette.error.main};

  &:focus {
    border-color: ${theme.palette.error.main};
    box-shadow: '0px 5px 10px ${theme.palette.error.main}';
  }
`;

export const baseStyle = (theme: Theme) => css`
  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: '0px 5px 10px ${theme.palette.primary.main}';
  }
`;

type Props = {
  readOnly: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
};

const useFormControlsStyle = ({ readOnly, error }: Props) => {
  const theme = useTheme();

  if (readOnly) {
    return readOnlyStyle(theme);
  }
  if (error) {
    return errorStyle(theme);
  }
  return baseStyle(theme);
};

export default useFormControlsStyle;
