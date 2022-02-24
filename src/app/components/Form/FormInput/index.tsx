/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, useTheme } from '@emotion/react/macro';
import {
  ErrorMessage,
  HelperText,
  Input,
  Label,
} from 'app/components/Form/components';
import {
  inputWrapperStyle,
  readOnlyInputStyle,
  errorInputStyle,
  baseInputStyle,
} from 'app/components/Form/styled/FormInput.styled';
import { Path, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';

const errorIconWrapperStyle = css`
  position: absolute;
  pointer-events: none;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.75rem;
`;

type Props<TFormValues> = {
  id: Path<TFormValues>;
  label: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  helperText?: string;
  validation?: object;
};

const FormInput = <TFormValues extends Record<string, unknown>>({
  id,
  label,
  validation,
  placeholder = '',
  helperText = '',
  type = 'text',
  readOnly = false,
  ...rest
}: Props<TFormValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const theme = useTheme();

  let inputStyle: SerializedStyles;
  if (readOnly) {
    inputStyle = readOnlyInputStyle(theme);
  } else if (errors[id]) {
    inputStyle = errorInputStyle(theme);
  } else {
    inputStyle = baseInputStyle(theme);
  }

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div css={inputWrapperStyle}>
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

        {errors[id] && (
          <div css={errorIconWrapperStyle}>
            <HiExclamationCircle
              css={css`
                font-size: 1.25rem;
                color: ${theme.palette.error.main};
              `}
            />
          </div>
        )}
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

export default FormInput;
