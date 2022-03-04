import styled from '@emotion/styled/macro';
import { ReactNode } from 'react';
import { FormProvider, UseFormReturn, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  row-gap: 1rem;

  @media (min-width: 640px) {
    width: ${100 / 2}%;
  }
`;

type Props<T extends Yup.AnyObjectSchema> = {
  children: ReactNode;
  methods: UseFormReturn<Yup.Asserts<T>>;
  onSubmit: SubmitHandler<Yup.Asserts<T>>;
};

const Form = <T extends Yup.AnyObjectSchema>({
  children,
  methods,
  onSubmit,
}: Props<T>) => {
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <FormGroup onSubmit={handleSubmit(onSubmit)}>{children}</FormGroup>
    </FormProvider>
  );
};

export default Form;
