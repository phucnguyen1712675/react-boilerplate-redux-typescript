/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import { FormInput, FormPasswordInput } from 'app/components/Form';
import { Button } from 'app/components/styled';
import { useAppDispatch, useFormWithSchema } from 'hooks';
import { FormProvider } from 'react-hook-form';
import { login } from 'store/slices/authSlice';
import type { LoginPayload } from 'types';
import { loginSchema } from 'validations/users/login.schema';

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  row-gap: 1rem;
  width: ${100 / 2}%;
`;

const LoginForm = () => {
  const methods = useFormWithSchema(loginSchema);
  const dispatch = useAppDispatch();

  const { handleSubmit } = methods;

  const onSubmit = (data: LoginPayload) => {
    dispatch(login(data));
  };

  return (
    <FormProvider {...methods}>
      <FormGroup onSubmit={handleSubmit(onSubmit)}>
        <FormInput<LoginPayload> id='email' label='Email' placeholder='Email' />
        <FormPasswordInput<LoginPayload>
          id='password'
          label='Password'
          placeholder='Password'
        />
        <Button
          type='submit'
          css={css`
            align-self: start;
            margin-top: 0.5rem;
          `}
        >
          Sign In
        </Button>
      </FormGroup>
    </FormProvider>
  );
};

export default LoginForm;
