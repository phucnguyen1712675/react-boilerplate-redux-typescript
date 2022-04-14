import ProtectedHttpClient from 'api/protected-http-client';
import appConfig from 'config';
import type { User } from 'types';

class UsersApi extends ProtectedHttpClient {
  private static classInstance?: UsersApi;

  private constructor() {
    super(`${appConfig.REACT_APP_BASE_URL}`);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new UsersApi();
    }

    return this.classInstance;
  }

  public getAll = () => {
    const url = '/users';
    return this.instance.get<User[]>(url);
  };
}
export default UsersApi;
