import { EntityId } from '@reduxjs/toolkit';
import ProtectedHttpClient from 'api/protected-http-client';
import appConfig from 'config';
import type { Post } from 'types';

class PostsApi extends ProtectedHttpClient {
  private static classInstance?: PostsApi;

  private constructor() {
    super(`${appConfig.REACT_APP_BASE_URL}`);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new PostsApi();
    }

    return this.classInstance;
  }

  public getAll = () => {
    const url = '/posts';
    return this.instance.get<Post[]>(url);
  };

  public getById = (id: EntityId) => {
    const url = `/posts/${id}`;
    return this.instance.get<Post>(url);
  };

  public add = (data: Omit<Post, 'id'>) => {
    const url = '/posts';
    return this.instance.post<Omit<Post, 'id'>, Post>(url, data);
  };

  public update = (data: Omit<Post, 'userId'>) => {
    const { id, ...rest } = data;
    const url = `/posts/${id}`;
    return this.instance.patch<Omit<Post, 'id' | 'userId'>, Post>(url, rest);
  };

  public remove = (id: EntityId) => {
    const url = `/posts/${id}`;
    return this.instance.delete<void>(url);
  };
}

export default PostsApi;
