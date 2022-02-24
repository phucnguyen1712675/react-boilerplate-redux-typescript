import { EntityId } from '@reduxjs/toolkit';

type Post = {
  id: EntityId;
  title: string;
  body: string;
  userId: EntityId;
};

export default Post;
