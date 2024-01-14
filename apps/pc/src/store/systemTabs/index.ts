import publicReducer from "../public";
import menuReducer from "../menu";
import tabsReducer from "../tabs";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		public: publicReducer,
		menu: menuReducer,
		tabs: tabsReducer
	}
});
export type RootState = typeof store.getState;
export type AppDispatch = typeof store.dispatch;
