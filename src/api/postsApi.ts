import { EntityId } from '@reduxjs/toolkit';
import axiosClient from 'api';
import type { Post } from 'types';

const postsApi = {
  getAll(): Promise<Post[]> {
    const url = '/posts';
    return axiosClient.get(url);
  },
  getById(id: EntityId): Promise<Post> {
    const url = `/posts/${id}`;
    return axiosClient.get(url);
  },
  add(data: Omit<Post, 'id'>): Promise<Post> {
    const url = '/posts';
    return axiosClient.post(url, data);
  },
  update(data: Omit<Post, 'userId'>): Promise<Post> {
    const { id, ...rest } = data;
    const url = `/posts/${id}`;
    return axiosClient.patch(url, rest);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  remove(id: EntityId): Promise<any> {
    const url = `/posts/${id}`;
    return axiosClient.delete(url);
  },
};

export default postsApi;
