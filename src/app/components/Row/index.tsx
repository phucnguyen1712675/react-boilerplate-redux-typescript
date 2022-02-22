/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { ReactNode, cloneElement, Children, isValidElement } from 'react';

import { Spacing } from 'types';
import { Box } from 'app/components/styled';

type Props = {
  children: ReactNode;
  space?: Spacing;
};

const Row = ({ children, space = 'none', ...props }: Props) => {
  return (
    <Box
      css={css`
        display: flex;
      `}
      {...props}
    >
      {Children.map<ReactNode, ReactNode>(children, (child, index) => {
        if (isValidElement(child)) {
          if (child.type !== Box) {
            // eslint-disable-next-line no-console
            console.warn(
              'Each child in a Row component should be a Box component'
            );
          }

          if (index > 0) {
            return cloneElement(child, {
              marginLeft: space,
              width: '100%',
            });
          }

          return cloneElement(child, { width: '100%' });
        }
        return child;
      })}
    </Box>
  );
};

export default Row;
