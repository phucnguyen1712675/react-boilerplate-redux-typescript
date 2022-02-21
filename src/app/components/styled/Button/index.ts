import styled from '@emotion/styled/macro';
import isPropValid from '@emotion/is-prop-valid';

import type { Theme } from 'types';
import defaultTheme from 'styles/theme';
import { spacing, fontSizes } from 'utils/units';

const buttonSizeProps = {
  small: {
    fontSize: fontSizes.xsmall,
    padding: `${spacing.xsmall} ${spacing.small}`,
  },
  medium: {
    fontSize: fontSizes.small,
    padding: `${spacing.small} ${spacing.medium}`,
  },
  large: {
    fontSize: fontSizes.medium,
    padding: `${spacing.medium} ${spacing.large}`,
  },
};

type Variant = 'solid' | 'outline';

type Palette = 'primary' | 'error';

type Size = keyof typeof buttonSizeProps;

const getPropsByVariant = ({
  variant,
  color,
  theme,
}: {
  variant: Variant;
  color?: Palette;
  theme: Theme;
}) => {
  const colorInPalette = color ? theme.palette[color] : undefined;

  const defaultOutlineVariantProps = {
    main: {
      border: `1px solid ${theme.palette.common.black}`,
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    hover: {
      border: `1px solid ${theme.palette.common.black}`,
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  };

  const outlineVariantPropsByPalette = colorInPalette && {
    main: {
      border: `1px solid ${colorInPalette.main}`,
      backgroundColor: theme.palette.common.white,
      color: colorInPalette.main,
    },
    hover: {
      border: `1px solid ${colorInPalette.light}`,
      backgroundColor: theme.palette.common.white,
      color: colorInPalette.light,
    },
  };

  const defaultSolidVariantProps = {
    main: {
      border: `1px solid ${theme.palette.grey[100]}`,
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.common.black,
    },
    hover: {
      border: `1px solid ${theme.palette.grey[200]}`,
      backgroundColor: theme.palette.grey[200],
    },
  };

  const solidVariantPropsByPalette = colorInPalette && {
    main: {
      border: `1px solid ${colorInPalette.main}`,
      backgroundColor: colorInPalette.main,
      color: colorInPalette.contrastText,
    },
    hover: {
      border: `1px solid ${colorInPalette.light}`,
      backgroundColor: colorInPalette.light,
    },
  };

  const variants = {
    outline: colorInPalette
      ? outlineVariantPropsByPalette
      : defaultOutlineVariantProps,
    solid: colorInPalette
      ? solidVariantPropsByPalette
      : defaultSolidVariantProps,
  };

  return variants[variant] || variants.solid;
};

type Props = {
  color?: Palette;
  variant?: Variant;
  size?: Size;
  theme?: Theme;
  enableElevation?: boolean;
  disabled?: boolean;
  className?: string;
};

const StyledButton = ({
  color,
  className,
  enableElevation = false,
  disabled = false,
  variant = 'solid',
  size = 'medium',
  theme = defaultTheme,
}: Props) => {
  const fontSizeBySize = buttonSizeProps[size]?.fontSize;
  const paddingBySize = buttonSizeProps[size]?.padding;

  const propsByVariant = getPropsByVariant({ variant, theme, color });

  return {
    className,
    fontWeight: 500,
    cursor: 'pointer',
    opacity: disabled ? 0.7 : undefined,
    transition: 'all 0.3s linear',
    padding: buttonSizeProps.medium.padding,
    fontSize: buttonSizeProps.medium.fontSize,
    borderRadius: theme.shape.borderRadius,
    boxShadow: enableElevation ? theme.shadows[1] : undefined,
    ...(propsByVariant && propsByVariant.main),
    ...(paddingBySize && { padding: paddingBySize }),
    ...(fontSizeBySize && { fontSize: fontSizeBySize }),
    '&:hover': !disabled && {
      boxShadow: enableElevation ? theme.shadows[2] : undefined,
      ...(propsByVariant && propsByVariant.hover),
    },
  };
};

const IGNORED_PROPS = ['color'];

const buttonConfig = {
  shouldForwardProp: (prop: string) =>
    isPropValid(prop) && !IGNORED_PROPS.includes(prop),
};

const Button = styled('button', buttonConfig)(StyledButton);

export default Button;