/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, useTheme } from '@emotion/react/macro';
import { useFormContext } from 'react-hook-form';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useState, SyntheticEvent, ReactElement } from 'react';

import type { IInputProps } from 'interfaces';
import {
  Label,
  Input,
  HelperText,
  ErrorMessage,
} from 'app/components/Form/components';

const FormPasswordInput = ({
  id,
  label,
  validation,
  placeholder = '',
  helperText = '',
  type = 'text',
  readOnly = false,
  ...rest
}: IInputProps) => {
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
    inputStyle = css`
      cursor: not-allowed;

      &:focus {
        border-color: ${theme.palette.grey[300]};
      }
    `;
  } else if (errors[id]) {
    inputStyle = css`
      border-color: ${theme.palette.error.main};

      &:focus {
        border-color: ${theme.palette.error.main};
        box-shadow: '0px 5px 10px ${theme.palette.error.main}';
      }
    `;
  } else {
    inputStyle = css`
      border-color: ${theme.palette.grey[300]};

      &:focus {
        border-color: ${theme.palette.primary.main};
        box-shadow: '0px 5px 10px ${theme.palette.primary.main}';
      }
    `;
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
    <>
      <Label htmlFor={id}>{label}</Label>
      <div
        css={css`
          position: relative;
          margin-top: 0.25rem;
        `}
      >
        <Input
          {...register(id, validation)}
          {...rest}
          type={type}
          name={id}
          id={id}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-describedby={id}
          css={inputStyle}
        />
        <button
          type='button'
          onClick={handleToggle}
          css={css`
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            display: flex;
            align-items: center;
            margin-right: 0.75rem;
            border-radius: 0.5rem;
            padding: 0.25rem;

            &:focus {
              outline: none;
              box-shadow: 0px 5px 10px ${theme.palette.primary.main};
            }
          `}
        >
          {buttonChild}
        </button>
      </div>
      <div
        css={css`
          margin-top: 0.25rem;
        `}
      >
        {helperText !== '' && <HelperText>{helperText}</HelperText>}
        {errors[id] && <ErrorMessage>{errors[id].message}</ErrorMessage>}
      </div>
    </>
  );
};

export default FormPasswordInput;
