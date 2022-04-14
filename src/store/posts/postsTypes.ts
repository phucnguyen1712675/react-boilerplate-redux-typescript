import { EntityId } from '@reduxjs/toolkit';
import { Post } from 'types';

export type AddPostPayload = Omit<Post, 'id'>;

export type EditPostPayload = Omit<Post, 'userId'>;

export type RemovePostPayload = {
  postId: EntityId;
  from: string;
};
