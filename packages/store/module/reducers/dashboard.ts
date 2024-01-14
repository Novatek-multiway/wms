import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IPosition {
  left: number;
  top: number;
}

export interface IDashboardState {
  visibleOperation: boolean;
  operationPosition: IPosition;
  locationId: string | undefined;
  containerCodeOptions: any[];
}

const defaultPosition: IPosition = {
  left: -200,
  top: -200,
};

const initialState: IDashboardState = {
  visibleOperation: false,
  operationPosition: defaultPosition,
  locationId: undefined,
  containerCodeOptions: [],
};
/**
 * @description commonSlice
 */
export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    setLocationId: (state, action: PayloadAction<string | undefined>) => {
      state.locationId = action.payload;
    },
    setPosition: (state, action: PayloadAction<IPosition>) => {
      state.operationPosition = action.payload;
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.visibleOperation = action.payload;
    },
    hideOperation: (state) => {
      state.operationPosition = defaultPosition;
      state.visibleOperation = false;
    },
    reset: (state) => {
      state.operationPosition = defaultPosition;
      state.visibleOperation = false;
      state.locationId = undefined;
    },
  },
});

export const {
  setLocationId,
  setPosition,
  setVisible,
  hideOperation,
  reset,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
