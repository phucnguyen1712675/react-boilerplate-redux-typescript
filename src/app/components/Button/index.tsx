import isPropValid from '@emotion/is-prop-valid';
import { CSSObject } from '@emotion/react/macro';
import styled, { Interpolation } from '@emotion/styled/macro';
import { MouseEventHandler, ReactNode } from 'react';
import defaultTheme from 'styles/theme';
import type { Theme } from 'types';
import { fontSizes, spacing } from 'utils';

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

interface IStyledButtonAttrsProps {
  color?: Palette;
  variant?: Variant;
  size?: Size;
  theme?: Theme;
  enableElevation?: boolean;
  disabled?: boolean;
}

const StyledButtonAttrs = ({
  color,
  enableElevation = false,
  disabled = false,
  variant = 'solid',
  size = 'medium',
  theme = defaultTheme,
}: IStyledButtonAttrsProps): CSSObject => {
  const fontSizeBySize = buttonSizeProps[size]?.fontSize;
  const paddingBySize = buttonSizeProps[size]?.padding;

  const propsByVariant = getPropsByVariant({ variant, theme, color });

  return {
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
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

const StyledButton = styled('button', buttonConfig)(StyledButtonAttrs);

interface IButtonProps extends IStyledButtonAttrsProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  css?: Interpolation<Theme>;
}

const Button = ({ children, type = 'button', ...rest }: IButtonProps) => {
  return (
    <StyledButton type={type} {...rest}>
      {children}
    </StyledButton>
  );
};
export default Button;
