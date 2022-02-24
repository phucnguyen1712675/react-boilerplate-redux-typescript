import styled from '@emotion/styled/macro';
import { Button } from 'app/components/styled';
import { useAppDispatch } from 'hooks';
import { logout } from 'store/slices/authSlice';

const Wrapper = styled.nav`
  display: flex;
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
      <Button color='primary' size='small'>
        Add new
      </Button>
      <Button variant='outline' size='small' onClick={handleLogout}>
        Log Out
      </Button>
    </Wrapper>
  );
};

export default Nav;
