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

type UserOperationInfo = {
  fetchUsersInfo: IRequestInfo;
};

const initialRequestStatus: UserOperationInfo = {
  fetchUsersInfo: {
    status: RequestStatus.IDLE,
  },
};

const initialState = usersAdapter.getInitialState(initialRequestStatus);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // =====================Fetch users========================
    fetchUsers(state) {
      state.fetchUsersInfo.status = RequestStatus.LOADING;
    },
    fetchUsersSucceeded(state, action: PayloadAction<User[]>) {
      state.fetchUsersInfo.status = RequestStatus.SUCCEEDED;
      state.fetchUsersInfo.error = undefined;
      usersAdapter.setAll(state, action.payload);
    },
    fetchUsersFailed(state, action: PayloadAction<string>) {
      state.fetchUsersInfo.status = RequestStatus.FAILED;
      state.fetchUsersInfo.error = action.payload;
    },
  },
});

export const { fetchUsers, fetchUsersSucceeded, fetchUsersFailed } =
  usersSlice.actions;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<RootState>(({ users }) => users);

export const selectFetchUsersInfo = (state: RootState) =>
  state.users.fetchUsersInfo;

export default usersSlice.reducer;
