import { Interpolation, Theme } from '@emotion/react/macro';

function createStyles<T extends { [key: string]: Interpolation<Theme> }>(
  arg: T
): T {
  return arg;
}

export default createStyles;
