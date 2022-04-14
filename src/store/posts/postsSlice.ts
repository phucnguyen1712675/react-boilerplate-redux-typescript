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
import {
  AddPostPayload,
  EditPostPayload,
  RemovePostPayload,
} from 'store/posts';
import { Post } from 'types';

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => Number(a.id) - Number(b.id),
});

type PostOperationInfo = {
  fetchPostsInfo: IRequestInfo;
  addPostInfo: IRequestInfo;
  editPostInfo: IRequestInfo;
  removePostInfo: IRequestInfo;
};

const initialFetchPostsInfo = {
  status: RequestStatus.IDLE,
};

const initialAddPostInfo = {
  status: RequestStatus.IDLE,
};

const initialEditPostInfo = {
  status: RequestStatus.IDLE,
};

const initialRemovePostInfo = {
  status: RequestStatus.IDLE,
};

const initialRequestStatus: PostOperationInfo = {
  fetchPostsInfo: initialFetchPostsInfo,
  addPostInfo: initialAddPostInfo,
  editPostInfo: initialEditPostInfo,
  removePostInfo: initialRemovePostInfo,
};

const initialState = postsAdapter.getInitialState(initialRequestStatus);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // =====================Fetch posts========================
    fetchPosts(state) {
      state.fetchPostsInfo.status = RequestStatus.LOADING;
    },
    fetchPostsSucceeded(state, action: PayloadAction<Post[]>) {
      state.fetchPostsInfo.status = RequestStatus.SUCCEEDED;
      state.fetchPostsInfo.error = undefined;
      postsAdapter.upsertMany(state, action.payload);
    },
    fetchPostsFailed(state, action: PayloadAction<string>) {
      state.fetchPostsInfo.status = RequestStatus.FAILED;
      state.fetchPostsInfo.error = action.payload;
    },
    // =====================Add new post========================
    addNewPost(state, _: PayloadAction<AddPostPayload>) {
      state.addPostInfo.status = RequestStatus.LOADING;
    },
    addNewPostSucceeded(state, action: PayloadAction<Post>) {
      state.addPostInfo.status = RequestStatus.SUCCEEDED;
      state.addPostInfo.error = undefined;
      postsAdapter.addOne(state, action.payload);
    },
    addNewPostFailed(state, action: PayloadAction<string>) {
      state.addPostInfo.status = RequestStatus.FAILED;
      state.addPostInfo.error = action.payload;
    },
    // =====================Set add post status========================
    resetAddPostInfo(state) {
      state.addPostInfo = initialAddPostInfo;
    },
    // =====================Edit post========================
    editPost(state, _: PayloadAction<EditPostPayload>) {
      state.editPostInfo.status = RequestStatus.LOADING;
    },
    editPostSucceeded(state, action: PayloadAction<EditPostPayload>) {
      state.editPostInfo.status = RequestStatus.SUCCEEDED;
      state.editPostInfo.error = undefined;
      const { id, ...changes } = action.payload;
      postsAdapter.updateOne(state, {
        id,
        changes,
      });
    },
    editPostFailed(state, action: PayloadAction<string>) {
      state.editPostInfo.status = RequestStatus.FAILED;
      state.editPostInfo.error = action.payload;
    },
    // =====================Set edit post status========================
    resetEditPostInfo(state) {
      state.editPostInfo = initialEditPostInfo;
    },
    // =====================Remove post========================
    removePost(state, _: PayloadAction<RemovePostPayload>) {
      state.removePostInfo.status = RequestStatus.LOADING;
    },
    removePostSucceeded(state, action: PayloadAction<RemovePostPayload>) {
      state.removePostInfo.status = RequestStatus.SUCCEEDED;
      state.removePostInfo.error = undefined;
      postsAdapter.removeOne(state, action.payload.postId);
    },
    removePostFailed(state, action: PayloadAction<string>) {
      state.removePostInfo.status = RequestStatus.FAILED;
      state.removePostInfo.error = action.payload;
    },
    // =====================Set remove post status========================
    resetRemovePostInfo(state) {
      state.removePostInfo = initialRemovePostInfo;
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
  resetAddPostInfo,
  editPost,
  editPostSucceeded,
  editPostFailed,
  resetEditPostInfo,
  removePost,
  removePostSucceeded,
  removePostFailed,
  resetRemovePostInfo,
} = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>(({ posts }) => posts);

export const selectFetchPostsInfo = (state: RootState) =>
  state.posts.fetchPostsInfo;
export const selectAddPostInfo = (state: RootState) => state.posts.addPostInfo;
export const selectEditPostInfo = (state: RootState) =>
  state.posts.editPostInfo;
export const selectRemovePostInfo = (state: RootState) =>
  state.posts.removePostInfo;

export const selectPostsByUser = createSelector(
  [selectAllPosts, (_: RootState, userId: EntityId) => userId],
  (posts, userId) =>
    posts.filter((post) => Number(post.userId) === Number(userId))
);

export default postsSlice.reducer;
