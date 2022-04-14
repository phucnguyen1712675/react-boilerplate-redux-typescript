import { UsersApi } from 'api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchUsers,
  fetchUsersFailed,
  fetchUsersSucceeded,
} from 'store/users/usersSlice';
import { User } from 'types';

const usersApi = UsersApi.getInstance();

function* fetchUsersAction() {
  try {
    const data: User[] = yield call(usersApi.getAll);
    yield put(fetchUsersSucceeded(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchUsersFailed(error.message));
    }
  }
}

export default function* usersSaga() {
  yield takeLatest(fetchUsers.type, fetchUsersAction);
}
