import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  EntityId,
} from '@reduxjs/toolkit';

import type { RootState } from 'store';
import axiosClient from 'services/api';

type User = {
  id: EntityId;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => Number(a.id) - Number(b.id),
});

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axiosClient.get('/users');
    return response.data;
  } catch (error) {
    throw new Error(error as string);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  },
});

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors<RootState>((state) => state.users);

export default usersSlice.reducer;
