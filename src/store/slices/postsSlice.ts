/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityId,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RequestStatus } from 'enums';
import type { IRequestInfo } from 'interfaces';
import type { RootState } from 'store';
import { Post } from 'types';

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => Number(a.id) - Number(b.id),
});

const initialRequestInfo: IRequestInfo = {
  status: RequestStatus.IDLE,
};

const initialState = postsAdapter.getInitialState(initialRequestInfo);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // =====================Fetch posts========================
    fetchPosts(state) {
      state.status = RequestStatus.LOADING;
    },
    fetchPostsSucceeded(state, action: PayloadAction<Post[]>) {
      state.status = RequestStatus.SUCCEEDED;
      postsAdapter.upsertMany(state, action.payload);
    },
    fetchPostsFailed(state, action: PayloadAction<string>) {
      state.status = RequestStatus.FAILED;
      state.error = action.payload;
    },
    // =====================Add new post========================
    addNewPost(state, _: PayloadAction<Omit<Post, 'id'>>) {
      state.status = RequestStatus.LOADING;
    },
    addNewPostSucceeded(state, action: PayloadAction<Post>) {
      state.status = RequestStatus.SUCCEEDED;
      postsAdapter.addOne(state, action.payload);
    },
    addNewPostFailed(state, action: PayloadAction<string>) {
      state.status = RequestStatus.FAILED;
      state.error = action.payload;
    },
    // =====================Edit post========================
    editPost(state, _: PayloadAction<Omit<Post, 'userId'>>) {
      state.status = RequestStatus.LOADING;
    },
    editPostSucceeded(state, action: PayloadAction<Omit<Post, 'userId'>>) {
      state.status = RequestStatus.SUCCEEDED;
      const { id, ...changes } = action.payload;
      postsAdapter.updateOne(state, {
        id,
        changes,
      });
    },
    editPostFailed(state, action: PayloadAction<string>) {
      state.status = RequestStatus.FAILED;
      state.error = action.payload;
    },
    // =====================Remove post========================
    removePost(state, _: PayloadAction<EntityId>) {
      state.status = RequestStatus.LOADING;
    },
    removePostSucceeded(state, action: PayloadAction<EntityId>) {
      state.status = RequestStatus.SUCCEEDED;
      postsAdapter.removeOne(state, action.payload);
    },
    removePostFailed(state, action: PayloadAction<string>) {
      state.status = RequestStatus.FAILED;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPosts,
  fetchPostsSucceeded,
  fetchPostsFailed,
  addNewPost,
  addNewPostSucceeded,
  addNewPostFailed,
  editPost,
  editPostSucceeded,
  editPostFailed,
  removePost,
  removePostSucceeded,
  removePostFailed,
} = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>(({ posts }) => posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_: RootState, userId: EntityId) => userId],
  (posts, userId) =>
    posts.filter((post) => Number(post.userId) === Number(userId))
);

export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;
