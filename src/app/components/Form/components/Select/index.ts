import styled from '@emotion/styled/macro';
import { Input } from 'app/components/Form/components';

const SelectWithInputStyle = styled(Input)`
  padding-right: 2.5rem;
`;

const Select = SelectWithInputStyle.withComponent('select');

export default Select;
