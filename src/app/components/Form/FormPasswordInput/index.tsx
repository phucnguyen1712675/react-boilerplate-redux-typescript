/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, useTheme } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import {
  ErrorMessage,
  HelperText,
  Input,
  Label,
} from 'app/components/Form/components';
import {
  baseInputStyle,
  errorInputStyle,
  inputWrapperStyle,
  readOnlyInputStyle,
} from 'app/components/Form/styled/FormInput.styled';
import { ReactElement, SyntheticEvent, useState } from 'react';
import { Path, useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';

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

  let inputStyle: SerializedStyles;
  if (readOnly) {
    inputStyle = readOnlyInputStyle(theme);
  } else if (errors[id]) {
    inputStyle = errorInputStyle(theme);
  } else {
    inputStyle = baseInputStyle(theme);
  }

  let buttonChild: ReactElement;
  const buttonStyle = css`
    cursor: pointer;
    font-size: 1.25rem;
    color: ${theme.palette.grey[300]};

    &:hover {
      color: ${theme.palette.grey[400]};
    }
  `;
  if (showPassword) {
    buttonChild = <HiEyeOff css={buttonStyle} />;
  } else {
    buttonChild = <HiEye css={buttonStyle} />;
  }

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div css={inputWrapperStyle}>
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
          {buttonChild}
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
