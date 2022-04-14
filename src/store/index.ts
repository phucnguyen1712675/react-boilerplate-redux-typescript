import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
  ThunkAction,
} from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { authReducer } from 'store/auth';
import { logoutSuccess } from 'store/auth/authSlice';
import { postsReducer } from 'store/posts';
import rootSaga from 'store/rootSaga';
import { usersReducer } from 'store/users';
import { fetchUsersSucceeded } from 'store/users/usersSlice';
import { history } from 'utils';

const combinedReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  users: usersReducer,
  posts: postsReducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === logoutSuccess.type) {
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [fetchUsersSucceeded.type],
      },
    }).concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
