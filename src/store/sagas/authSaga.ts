import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { ACCESS_TOKEN_KEY } from 'app_constants';
import { push } from 'connected-react-router';
import { call, fork, put, take } from 'redux-saga/effects';
import { ROUTE_PATHS } from 'routes';
import {
  login,
  loginFailed,
  loginSuccess,
  logout,
} from 'store/slices/authSlice';
import { LoginPayload, User } from 'types';

function* loginAction(payload: LoginPayload) {
  try {
    const currentUser: User | undefined = yield call(authApi.login, payload);

    if (currentUser) {
      localStorage.setItem(ACCESS_TOKEN_KEY, 'fake_token');

      yield put(loginSuccess(currentUser));

      // redirect to home page
      yield put(push(ROUTE_PATHS.HOME));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(loginFailed(error.message));
    }
  }
}

function* logoutAction() {
  yield call(authApi.logout);

  localStorage.removeItem(ACCESS_TOKEN_KEY);

  // redirect to login page
  yield put(push(ROUTE_PATHS.LOGIN));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = !!localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(login.type);
      yield call(loginAction, action.payload);
    } else {
      yield take(logout.type);
      yield call(logoutAction);
    }
  }
}

function* authSaga() {
  yield fork(watchLoginFlow);
}

export default authSaga;
