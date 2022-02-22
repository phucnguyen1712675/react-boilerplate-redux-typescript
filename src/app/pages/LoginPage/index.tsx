import { Helmet } from 'react-helmet-async';

// import { NavBar } from 'app/components';
import { PageWrapper, Title } from 'app/components/styled';
import { LoginForm } from 'app/pages/LoginPage/components';

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
