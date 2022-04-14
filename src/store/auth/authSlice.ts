/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from 'enums';
import { IRequestInfo } from 'interfaces';
import type { RootState } from 'store';
import { LoginPayload, User } from 'types';

export interface IAuthState {
  isLoggedIn: boolean;
  currentUser?: User;
  authInfo: IRequestInfo;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  authInfo: {
    status: RequestStatus.IDLE,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, _: PayloadAction<LoginPayload>) {
      state.authInfo.status = RequestStatus.LOADING;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.authInfo.status = RequestStatus.SUCCEEDED;
      state.currentUser = action.payload;
      state.authInfo.error = undefined;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.authInfo.status = RequestStatus.FAILED;
      state.authInfo.error = action.payload;
    },
    logout(state) {
      state.authInfo.status = RequestStatus.LOADING;
    },
    logoutSuccess(state) {
      state.authInfo.status = RequestStatus.SUCCEEDED;
      state.isLoggedIn = false;
      state.currentUser = undefined;
      state.authInfo.error = undefined;
    },
    logoutFailed(state, action: PayloadAction<string>) {
      state.authInfo.status = RequestStatus.FAILED;
      state.authInfo.error = action.payload;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailed,
  logout,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export const selectAuthIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectAuthInfo = (state: RootState) => state.auth.authInfo;

export default authSlice.reducer;
