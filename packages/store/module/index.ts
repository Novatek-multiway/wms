import {
  Provider,
  TypedUseSelectorHook,
  useSelector,
  useDispatch,
  shallowEqual,
} from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import common, { setData } from './reducers/common';
import user, { setMenu, setUserToken, setCurrentUser, setLocale } from './reducers/user';

import inbound, { setInboundSelections } from './reducers/inbound';
import outbound, { setInvoiceRecord } from './reducers/outbount';
import scanner, { setScannerKey, setScannerMap, resetScannerValue } from './reducers/scanner';

import dashboard, {
  setLocationId,
  setPosition,
  setVisible,
  hideOperation,
  reset,
} from './reducers/dashboard';

const store = configureStore({
  reducer: {
    user,
    common,
    dashboard,
    inbound,
    outbound,
    scanner,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['user/setMenu'],
        // Ignore these paths in the state
        ignoredPaths: ['user'],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
type AppDispatch = typeof store.dispatch;

export { store, Provider, useSelector, useDispatch, shallowEqual };

export {
  setUserToken,
  setMenu,
  setData,
  setCurrentUser,
  setPosition,
  setVisible,
  hideOperation,
  reset,
  setInboundSelections,
  setInvoiceRecord,
  setScannerKey,
  setScannerMap,
  resetScannerValue,
  setLocale,
  setLocationId,
};

export type { RootState, AppDispatch, TypedUseSelectorHook };
