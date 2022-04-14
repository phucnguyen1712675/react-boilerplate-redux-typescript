import store from 'store';
import { selectAllUsers } from 'store/users/usersSlice';
import { LoginPayload, User } from 'types';
import ProtectedHttpClient from 'api/protected-http-client';
import appConfig from 'config';

const authLogin = (data: LoginPayload) => {
  return new Promise<User | undefined>((resolve) => {
    setTimeout(() => {
      const state = store.getState();
      const users = selectAllUsers(state);
      // Only check email for demo purpose
      const currentUser = users.find((user) => user.email === data.email);
      resolve(currentUser);
    }, 1000);
  });
};

const authLogout = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), 500);
  });
};

class AuthApi extends ProtectedHttpClient {
  public readonly login: typeof authLogin;

  public readonly logout: typeof authLogout;

  private static classInstance?: AuthApi;

  private constructor() {
    super(`${appConfig.REACT_APP_BASE_URL}`);
    this.login = authLogin.bind(this);
    this.logout = authLogout.bind(this);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AuthApi();
    }

    return this.classInstance;
  }
}

export default AuthApi;
