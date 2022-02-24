/* eslint-disable no-console */
import { EntityId, PayloadAction } from '@reduxjs/toolkit';
import { postsApi } from 'api';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
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
} from 'store/slices/postsSlice';
import { Post } from 'types';

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

function* addNewPostAction(action: PayloadAction<Omit<Post, 'id'>>) {
  try {
    const data: Post = yield call(postsApi.add, action.payload);
    yield put(addNewPostSucceeded(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(addNewPostFailed(error.message));
    }
  }
}

function* editPostAction(action: PayloadAction<Omit<Post, 'userId'>>) {
  try {
    yield call(postsApi.update, action.payload);
    yield put(editPostSucceeded(action.payload));
  } catch (error) {
    if (error instanceof Error) {
      yield put(editPostFailed(error.message));
    }
  }
}

function* removePostAction(action: PayloadAction<EntityId>) {
  try {
    yield call(postsApi.remove, action.payload);
    yield put(removePostSucceeded(action.payload));
  } catch (error) {
    if (error instanceof Error) {
      yield put(removePostFailed(error.message));
    }
  }
}

export default function* postsSaga() {
  yield takeLatest(fetchPosts.type, fetchPostsAction);
  yield takeEvery(addNewPost.type, addNewPostAction);
  yield takeEvery(editPost.type, editPostAction);
  yield takeEvery(removePost.type, removePostAction);
}
