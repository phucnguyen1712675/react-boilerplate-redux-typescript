import { authSaga, postsSaga, usersSaga } from 'store/sagas';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([authSaga(), usersSaga(), postsSaga()]);
}

export default rootSaga;
