import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LOCALE, setStorage, TOKEN } from 'utils';
import { getStorage } from 'utils';
// import { MenuItem } from "@/components/Layout/layout";

export interface IUserInitialState {
  token: string;
  menu: any[];
  currentUser: API.UserPermissionDTO | null;
  locale: 'ko_KR' | 'en_US';
}

// 默认状态
const initialState: IUserInitialState = {
  token: getStorage(TOKEN) ?? '',
  menu: [],
  currentUser: null,
  locale: getStorage(LOCALE) ?? 'ko_KR',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<API.UserPermissionDTO>) => {
      state.currentUser = action.payload;
    },
    setLocale: (state, action: PayloadAction<IUserInitialState['locale']>) => {
      state.locale = action.payload;
      setStorage(LOCALE, action.payload);
    },
  },
});

export const { setUserToken, setMenu, setCurrentUser, setLocale } = userSlice.actions;

export default userSlice.reducer;
