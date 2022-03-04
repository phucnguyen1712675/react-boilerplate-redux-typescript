import styled from '@emotion/styled/macro';
import { PageWrapper, Title } from 'app/components/styled';
import { LoginForm } from 'app/features/auth/LoginPage/components';
import { Helmet } from 'react-helmet-async';

const LoginPageWrapper = styled(PageWrapper)`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const LoginSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LoginTitle = styled(Title)`
  margin: 1rem 0;
`;

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login Page</title>
        <meta name='description' content='LoginPage' />
      </Helmet>
      <LoginPageWrapper>
        <LoginSection>
          <LoginTitle>Login Page</LoginTitle>
          <LoginForm />
        </LoginSection>
      </LoginPageWrapper>
    </>
  );
};

export default LoginPage;
