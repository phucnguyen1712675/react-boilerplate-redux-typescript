import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
  EntityId,
} from '@reduxjs/toolkit';

import type { RootState } from 'store';
import { REQUEST_STATUS } from 'enums';
import axiosClient from 'services/api';

type Post = {
  id: EntityId;
  title: string;
  body: string;
  userId: EntityId;
};

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => Number(a.id) - Number(b.id),
});

const initialState = postsAdapter.getInitialState({
  status: REQUEST_STATUS.IDLE,
  error: null,
} as {
  status: REQUEST_STATUS;
  error?: string | null;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axiosClient.get('/posts');
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
});

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost: { title: string; body: string; userId: EntityId }) => {
    try {
      const response = await axiosClient.post('/posts', initialPost);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async (post: { title: string; body: string; id: EntityId }) => {
    const { id, ...rest } = post;
    try {
      const response = await axiosClient.patch(`/posts/${id}`, rest);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  }
);

export const removePost = createAsyncThunk(
  'posts/removePost',
  async (postId: EntityId) => {
    try {
      await axiosClient.delete(`/posts/${postId}`);
      return postId;
    } catch (error) {
      throw new Error(error as string);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
      .addCase(editPost.fulfilled, (state, action) => {
        const { id, ...changes } = action.payload;
        postsAdapter.updateOne(state, {
          id,
          changes,
        });
      })
      .addCase(removePost.fulfilled, postsAdapter.removeOne);
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>((state) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_: RootState, userId: EntityId) => userId],
  (posts, userId) =>
    posts.filter((post) => {
      // Because EntityId is a union type
      if (typeof userId === typeof post.userId) {
        return post.userId === userId;
      }
      return Number(post.userId) === Number(userId);
    })
);

export default postsSlice.reducer;
