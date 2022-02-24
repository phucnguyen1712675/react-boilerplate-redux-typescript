import axiosClient from 'api';
import type { User } from 'types';

const usersApi = {
  getAll(): Promise<User[]> {
    const url = '/users';
    return axiosClient.get(url);
  },
};

export default usersApi;
