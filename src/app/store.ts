import {
  configureStore,
  ThunkAction,
  Action,
  createSlice,
} from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {},
});

const counterReducer = counterSlice.reducer;

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
