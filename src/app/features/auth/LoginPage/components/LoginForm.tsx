/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import { FormGroup, FormInput, FormPasswordInput } from 'app/components/Form';
import { Button } from 'app/components/styled';
import { useAppDispatch, useFormWithSchema } from 'hooks';
import { FormProvider } from 'react-hook-form';
import { login } from 'store/slices/authSlice';
import type { LoginPayload } from 'types';
import { loginSchema } from 'validations/users/login.schema';

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
            align-self: flex-start;
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
