/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import {
  ErrorMessage,
  HelperText,
  Input,
  Label,
} from 'app/components/Form/components';
import { wrapperStyle } from 'app/components/Form/styled';
import { useFormControlsStyle } from 'hooks';
import { ReactElement, SyntheticEvent, useState } from 'react';
import { Path, useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Theme } from 'types';

const ShowOrHidePassword = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
  border-radius: 0.5rem;
  padding: 0.25rem;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`;

const iconStyle = (theme: Theme) => css`
  cursor: pointer;
  font-size: 1.25rem;
  color: ${theme.palette.grey[300]};

  &:hover {
    color: ${theme.palette.grey[400]};
  }
`;

type Props<TFormValues> = {
  id: Path<TFormValues>;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  helperText?: string;
  validation?: object;
};

const FormPasswordInput = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  validation,
  placeholder = '',
  helperText = '',
  readOnly = false,
  ...rest
}: Props<TFormValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleToggle = (e: SyntheticEvent) => {
    e.preventDefault();
    togglePassword();
  };

  const inputStyle = useFormControlsStyle({
    readOnly,
    error: errors[id],
  });

  const passwordIconStyle = iconStyle(theme);
  let icon: ReactElement;
  if (showPassword) {
    icon = <HiEyeOff css={passwordIconStyle} />;
  } else {
    icon = <HiEye css={passwordIconStyle} />;
  }

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div css={wrapperStyle}>
        <Input
          {...register(id, validation)}
          {...rest}
          type={showPassword ? 'text' : 'password'}
          name={id}
          id={id}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-describedby={id}
          css={inputStyle}
        />
        <ShowOrHidePassword type='button' onClick={handleToggle}>
          {icon}
        </ShowOrHidePassword>
      </div>
      <div
        css={css`
          margin-top: 0.25rem;
        `}
      >
        {helperText !== '' && <HelperText>{helperText}</HelperText>}
        {errors[id] && <ErrorMessage>{errors[id].message}</ErrorMessage>}
      </div>
    </div>
  );
};

export default FormPasswordInput;
