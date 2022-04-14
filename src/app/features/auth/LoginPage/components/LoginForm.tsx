import {
  Form,
  FormInput,
  FormPasswordInput,
  FormSubmitButton,
} from 'app/components/Form';
import {
  useAppDispatch,
  useFormWithSchema,
  useRequestInfoWithErrorSwal,
} from 'hooks';
import { login, selectAuthInfo } from 'store/auth/authSlice';
import type { LoginPayload } from 'types';
import { loginSchema } from 'validations/users/login.schema';

type LoginSchema = typeof loginSchema;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const methods = useFormWithSchema(loginSchema);
  const { loading } = useRequestInfoWithErrorSwal(selectAuthInfo);

  const onSubmit = (data: LoginPayload) => {
    dispatch(login(data));
  };

  const canLogin = !loading;

  return (
    <Form<LoginSchema> methods={methods} onSubmit={onSubmit}>
      <FormInput<LoginPayload> id='email' label='Email' placeholder='Email' />
      <FormPasswordInput<LoginPayload>
        id='password'
        label='Password'
        placeholder='Password'
      />
      <FormSubmitButton disabled={!canLogin}>
        {loading ? 'Signing In' : 'Sign In'}
      </FormSubmitButton>
    </Form>
  );
};

export default LoginForm;
