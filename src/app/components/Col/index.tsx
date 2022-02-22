/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { ReactNode, cloneElement, Children, isValidElement } from 'react';

import { Spacing } from 'types';
import { Row } from 'app/components';
import { Box } from 'app/components/styled';

const StackChildrenTypes: ReactNode[] = [Box, Row];

const UnsupportedChildTypeWarning =
  'Each child in a Col component should be one of the types: Box, Row';

type Props = {
  children: ReactNode;
  space?: Spacing;
  className?: string;
};

const Col = ({ children, space = 'none', ...props }: Props) => {
  return (
    <Box
      css={css`
        display: flex;
        flex-direction: column;
      `}
      {...props}
    >
      {Children.map<ReactNode, ReactNode>(children, (child, index) => {
        if (isValidElement(child)) {
          if (!StackChildrenTypes.includes(child.type)) {
            // eslint-disable-next-line no-console
            console.warn(UnsupportedChildTypeWarning);
          }

          if (index > 0) {
            return cloneElement(child, { marginTop: space });
          }
        }

        return child;
      })}
    </Box>
  );
};

export default Col;
