import { RequestStatus } from 'enums';

interface IRequestInfo {
  status: RequestStatus;
  error?: string;
}

export default IRequestInfo;
