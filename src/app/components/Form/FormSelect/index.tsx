/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import {
  ErrorIconWrapper,
  ErrorMessage,
  HelperText,
  Select,
  Label,
} from 'app/components/Form/components';
import { wrapperStyle } from 'app/components/Form/styled';
import { useFormControlsStyle } from 'hooks';
import { Children, cloneElement, isValidElement, ReactNode } from 'react';
import { Path, useFormContext } from 'react-hook-form';

type Props<TFormValues> = {
  id: Path<TFormValues>;
  label: string;
  children: ReactNode;
  helperText?: string;
  placeholder?: string;
  validation?: object;
  readOnly?: boolean;
  defaultValue?: string;
};

const FormSelect = <TFormValues extends Record<string, unknown>>({
  label,
  id,
  validation,
  children,
  helperText = '',
  placeholder = '',
  readOnly = false,
  ...rest
}: Props<TFormValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const selectStyle = useFormControlsStyle({
    readOnly,
    error: errors[id],
  });

  // Add disabled and selected attribute to option, will be used if readonly
  const readOnlyChildren = Children.map<ReactNode, ReactNode>(
    children,
    (child) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          disabled: child.props.value !== rest?.defaultValue,
          selected: child.props.value === rest?.defaultValue,
        });
      }
      return child;
    }
  );

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div css={wrapperStyle}>
        <Select
          {...register(id, validation)}
          // defaultValue to value blank, will get overriden by ...rest if needed
          defaultValue=''
          {...rest}
          name={id}
          id={id}
          aria-describedby={id}
          css={selectStyle}
        >
          {placeholder && (
            <option value='' disabled hidden>
              {placeholder}
            </option>
          )}
          {readOnly ? readOnlyChildren : children}
        </Select>
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

export default FormSelect;
