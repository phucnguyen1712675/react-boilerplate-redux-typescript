/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import {
  ErrorIconWrapper,
  ErrorMessage,
  HelperText,
  Input,
  Label,
} from 'app/components/Form/components';
import { wrapperStyle } from 'app/components/Form/styled';
import { useFormControlsStyle } from 'hooks';
import { Path, useFormContext } from 'react-hook-form';

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

  const inputStyle = useFormControlsStyle({
    readOnly,
    error: errors[id],
  });

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div css={wrapperStyle}>
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

        {errors[id] && <ErrorIconWrapper />}
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
