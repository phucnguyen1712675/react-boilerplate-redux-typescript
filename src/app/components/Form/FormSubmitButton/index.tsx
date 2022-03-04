import styled from '@emotion/styled/macro';
import { Button } from 'app/components/styled';
import { ComponentProps } from 'react';

const FormButton = styled(Button)`
  align-self: flex-start;
  margin-top: 0.5rem;
`;

type Props = ComponentProps<typeof FormButton>;

const FormSubmitButton = (props: Props) => {
  return <FormButton type='submit' {...props} />;
};

export default FormSubmitButton;
