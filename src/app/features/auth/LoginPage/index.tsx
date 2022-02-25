import { PageWrapper, Title } from 'app/components/styled';
import { LoginForm } from 'app/features/auth/LoginPage/components';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login Page</title>
        <meta name='description' content='LoginPage' />
      </Helmet>
      <PageWrapper>
        <Title>Login Page</Title>
        <LoginForm />
      </PageWrapper>
    </>
  );
};

export default LoginPage;
