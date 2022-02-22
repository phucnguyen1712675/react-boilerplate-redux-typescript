/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import styled from '@emotion/styled/macro';
import { FormProvider } from 'react-hook-form';

import { useFormWithSchema } from 'hooks';
import { Button } from 'app/components/styled';
import { FormInput, FormPasswordInput } from 'app/components/Form';
import { ILoginFormValues, loginSchema } from 'validations/users/login.schema';

const FormGroup = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const LoginForm = () => {
  const methods = useFormWithSchema(loginSchema);

  const { handleSubmit } = methods;

  const onSubmit = (data: ILoginFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <FormGroup
        // className='mb-4 flex flex-col gap-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput id='email' label='Email' placeholder='Email' />
        <FormPasswordInput
          id='password'
          label='Password'
          placeholder='Password'
        />
        <Button
          type='submit'
          css={css`
            width: 100%;
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
