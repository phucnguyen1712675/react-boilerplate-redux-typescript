/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import {
  ErrorIconWrapper,
  ErrorMessage,
  HelperText,
  Label,
  TextArea,
} from 'app/components/Form/components';
import { wrapperStyle } from 'app/components/Form/styled';
import { useFormControlsStyle } from 'hooks';
import { Path, useFormContext } from 'react-hook-form';

type Props<TFormValues> = {
  id: Path<TFormValues>;
  label: string;
  placeholder?: string;
  readOnly?: boolean;
  helperText?: string;
  validation?: object;
};

const FormTextArea = <TFormValues extends Record<string, unknown>>({
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

  const textAreaStyle = useFormControlsStyle({
    readOnly,
    error: errors[id],
  });

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div css={wrapperStyle}>
        <TextArea
          {...register(id, validation)}
          rows={3}
          {...rest}
          name={id}
          id={id}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-describedby={id}
          css={textAreaStyle}
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

export default FormTextArea;
