import { PayloadAction } from '@reduxjs/toolkit';
import { PostsApi } from 'api';
import { push } from 'connected-react-router';
import {
  call,
  put,
  putResolve,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  AddPostPayload,
  EditPostPayload,
  RemovePostPayload,
} from 'store/posts';
import {
  addNewPost,
  addNewPostFailed,
  addNewPostSucceeded,
  editPost,
  editPostFailed,
  editPostSucceeded,
  fetchPosts,
  fetchPostsFailed,
  fetchPostsSucceeded,
  removePost,
  removePostFailed,
  removePostSucceeded,
  resetAddPostInfo,
  resetEditPostInfo,
  resetRemovePostInfo,
} from 'store/posts/postsSlice';
import { Post } from 'types';

const postsApi = PostsApi.getInstance();

function* fetchPostsAction() {
  try {
    const data: Post[] = yield call(postsApi.getAll);
    yield put(fetchPostsSucceeded(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchPostsFailed(error.message));
    }
  }
}

function* addNewPostAction(action: PayloadAction<AddPostPayload>) {
  try {
    const data: Post = yield call(postsApi.add, action.payload);
    yield put(addNewPostSucceeded(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(addNewPostFailed(error.message));
    }
  } finally {
    yield put(resetAddPostInfo());
  }
}

function* editPostAction(action: PayloadAction<EditPostPayload>) {
  const { payload } = action;
  try {
    yield call(postsApi.update, payload);
    yield put(editPostSucceeded(payload));
  } catch (error) {
    if (error instanceof Error) {
      yield put(editPostFailed(error.message));
    }
  } finally {
    yield put(resetEditPostInfo());
  }
}

function* removePostAction(action: PayloadAction<RemovePostPayload>) {
  const { payload } = action;
  const { postId, from } = payload;
  try {
    yield call(postsApi.remove, postId);
    yield put(removePostSucceeded(payload));
  } catch (error) {
    if (error instanceof Error) {
      yield put(removePostFailed(error.message));
    }
  } finally {
    yield putResolve(resetRemovePostInfo());
    yield put(push(from));
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPosts.type, fetchPostsAction);
  yield takeEvery(addNewPost.type, addNewPostAction);
  yield takeEvery(editPost.type, editPostAction);
  yield takeEvery(removePost.type, removePostAction);
}
