import { NavBar } from 'app/components';
import { PageWrapper } from 'app/components/styled';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name='description' content='Homepage' />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <h1>Login Page</h1>
      </PageWrapper>
    </>
  );
};

export default HomePage;
