import styled from '@emotion/styled/macro';

import { Button } from 'app/components/styled';

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
  column-gap: 1rem;
`;

const Nav = () => {
  return (
    <Wrapper>
      <Button color='primary' size='small'>
        Add new
      </Button>
      <Button variant='outline' size='small'>
        Log Out
      </Button>
    </Wrapper>
  );
};

export default Nav;
