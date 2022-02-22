import styled from '@emotion/styled/macro';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  color: ${(p) => p.theme.text};
  font-weight: bold;
  margin-right: 1rem;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${(p) => p.theme.textSecondary};
  font-weight: normal;
`;

const Logo = () => {
  return (
    <Wrapper>
      <Title>React Week 2</Title>
      <Description>For Redux Saga</Description>
    </Wrapper>
  );
};

export default Logo;
