import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RequestStatus } from 'enums';
import type { IRequestInfo } from 'interfaces';
import type { RootState } from 'store';
import { User } from 'types';

const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => Number(a.id) - Number(b.id),
});

const initialRequestInfo: IRequestInfo = {
  status: RequestStatus.IDLE,
};
const initialState = usersAdapter.getInitialState(initialRequestInfo);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // =====================Fetch users========================
    fetchUsers(state) {
      state.status = RequestStatus.LOADING;
    },
    fetchUsersSucceeded(state, action: PayloadAction<User[]>) {
      state.status = RequestStatus.SUCCEEDED;
      usersAdapter.setAll(state, action.payload);
    },
    fetchUsersFailed(state, action: PayloadAction<string>) {
      state.status = RequestStatus.FAILED;
      state.error = action.payload;
    },
  },
});

export const { fetchUsers, fetchUsersSucceeded, fetchUsersFailed } =
  usersSlice.actions;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<RootState>(({ users }) => users);

export default usersSlice.reducer;
