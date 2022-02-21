import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import usersReducer from 'store/usersSlice';
import postsReducer from 'store/postsSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
