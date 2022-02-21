import { SerializedStyles, CSSObject } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import isPropValid from '@emotion/is-prop-valid';

import { Theme, Spacing } from 'types';
import { spacing } from 'utils/units';

type Props = {
  padding?: Spacing;
  paddingTop?: Spacing;
  paddingRight?: Spacing;
  paddingBottom?: Spacing;
  paddingLeft?: Spacing;
  margin?: Spacing;
  marginTop?: Spacing;
  marginRight?: Spacing;
  marginBottom?: Spacing;
  marginLeft?: Spacing;
  paddingX?: Spacing;
  paddingY?: Spacing;
  marginX?: Spacing;
  marginY?: Spacing;
  width?: string;
  display?: string;
  theme?: Theme;
  className?: string;
  css?: SerializedStyles;
};

const StyledBox = ({
  paddingX,
  paddingY,
  marginX,
  marginY,
  width,
  display,
  className,
  css,
  ...props
}: Props): CSSObject => {
  const padding = props.padding ? spacing[props.padding] : undefined;
  let paddingTop = props.paddingTop ? spacing[props.paddingTop] : undefined;
  let paddingRight = props.paddingRight
    ? spacing[props.paddingRight]
    : undefined;
  let paddingBottom = props.paddingBottom
    ? spacing[props.paddingBottom]
    : undefined;
  let paddingLeft = props.paddingLeft ? spacing[props.paddingLeft] : undefined;

  if (paddingX) {
    paddingLeft = spacing[paddingX];
    paddingRight = spacing[paddingX];
  }

  if (paddingY) {
    paddingTop = spacing[paddingY];
    paddingBottom = spacing[paddingY];
  }

  const margin = props.margin ? spacing[props.margin] : undefined;
  let marginTop = props.marginTop ? spacing[props.marginTop] : undefined;
  let marginRight = props.marginRight ? spacing[props.marginRight] : undefined;
  let marginBottom = props.marginBottom
    ? spacing[props.marginBottom]
    : undefined;
  let marginLeft = props.marginLeft ? spacing[props.marginLeft] : undefined;

  if (marginX) {
    marginLeft = spacing[marginX];
    marginRight = spacing[marginX];
  }

  if (marginY) {
    marginTop = spacing[marginY];
    marginBottom = spacing[marginY];
  }

  return {
    padding,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    width,
    display,
    className,
    ...css,
  };
};

const IGNORED_PROPS = ['display', 'width'];

const boxConfig = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && !IGNORED_PROPS.includes(prop),
};

const Box = styled('div', boxConfig)(StyledBox);

export default Box;
