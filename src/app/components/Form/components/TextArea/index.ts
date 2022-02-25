import styled from '@emotion/styled/macro';
import { Input } from 'app/components/Form/components';

const TextAreaWithInputStyle = styled(Input)`
  height: unset;
  padding: 0.5rem 0.75rem;
`;

const TextArea = TextAreaWithInputStyle.withComponent('textarea');

export default TextArea;
