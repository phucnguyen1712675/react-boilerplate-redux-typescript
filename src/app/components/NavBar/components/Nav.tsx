import styled from '@emotion/styled/macro';
import { Button, Link } from 'app/components/styled';
import { useAppDispatch } from 'hooks';
import { ROUTE_PATHS } from 'routes';
import { logout } from 'store/slices/authSlice';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  margin-right: -1rem;
  column-gap: 1rem;
`;

const Nav = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Wrapper>
      <Link to={ROUTE_PATHS.HOME}>Posts</Link>
      <Link to={ROUTE_PATHS.USERS}>Users</Link>
      <Button variant='outline' size='small' onClick={handleLogout}>
        Log Out
      </Button>{' '}
    </Wrapper>
  );
};

export default Nav;
