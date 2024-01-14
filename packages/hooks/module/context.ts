import React, { Dispatch } from 'react';
import { setUserToken, setCurrentUser } from 'store';
import { getStorage, removeStorage, setStorage, TOKEN } from 'utils';
import { AuthLogin, AuthLogout } from 'apis';
import type { API } from 'apis';

interface AuthContextType {
  signIn: (dispatch: Dispatch<any>, signInFn: any) => Promise<unknown>;
  signOut: (dispatch: Dispatch<any>) => Promise<unknown>;
  setDistToken: (dispatch: Dispatch<any>) => Promise<unknown> | any;
}

export const signIn = async (dispatch: any, data: API.LoginModel) => {
  const { resultData } = await AuthLogin(data);
  setStorage(TOKEN, resultData, 1000 * 60 * 60 * 24);
  dispatch(setUserToken(getStorage(TOKEN)));
};

export const signOut = async (dispatch: any) => {
  const { resultData } = await AuthLogout();
  if (resultData) {
    removeStorage(TOKEN);
    dispatch(setUserToken(''));
    dispatch(setCurrentUser(null));
  }
};

export const setDistToken = (dispatch: Dispatch<any>) => {
  const resultData = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOiIxNjg5MDYwMTY4IiwiZXhwIjo0ODEzMTY4OTA4LCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6InR2VXNlciIsIlJlYWxOYW1lIjoi5aSn5bGP6LSm5Y-3IiwiVXNlck5hbWUiOiJ0dlVzZXIiLCJBdmF0b3IiOiIiLCJVc2VySWQiOiIxNjc4MzA1MDU2NDk3MzQ0NTEyIiwiQXVkaWVuY2UiOiLlpKflsY_otKblj7ctMjAyMy0wNy0xMSAxNToyMTo0OCIsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyMjgiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MjI4In0.dd2wMrClFWrWzKwePi55yMp1AXi6qF9_miE9n2peGm0`;
  setStorage(TOKEN, resultData, 1000 * 60 * 60 * 24);
  dispatch(setUserToken(getStorage(TOKEN)));
};

export const AuthContext = React.createContext<AuthContextType>({
  signIn,
  signOut,
  setDistToken,
});
