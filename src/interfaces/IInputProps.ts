import { Path } from 'react-hook-form';
import { ILoginFormValues } from 'validations/users/login.schema';

interface IInputProps {
  id: Path<ILoginFormValues>;
  label: string;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  helperText?: string;
  validation?: object;
}

export default IInputProps;
