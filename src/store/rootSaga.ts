import { all } from 'redux-saga/effects';
import { authSaga } from 'store/auth';
import { postsSaga } from 'store/posts';
import { usersSaga } from 'store/users';

function* rootSaga() {
  yield all([authSaga(), usersSaga(), postsSaga()]);
}

export default rootSaga;
