import { NavBar } from 'app/components';
import { PageWrapper } from 'app/components/styled';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <PageWrapper>{children}</PageWrapper>
    </>
  );
};

export default Layout;
