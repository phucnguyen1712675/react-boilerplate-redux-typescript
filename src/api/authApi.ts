import store from 'store';
import { selectAllUsers } from 'store/slices/usersSlice';
import { User, LoginPayload } from 'types';

const authApi = {
  login(data: LoginPayload): Promise<User | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const state = store.getState();
        const users = selectAllUsers(state);
        // Only check email for demo purpose
        const currentUser = users.find((user) => user.email === data.email);
        resolve(currentUser);
      }, 1000);
    });
  },
  logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });
  },
};

export default authApi;
