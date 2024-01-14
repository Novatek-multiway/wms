import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IScannerState {
  scannerKey: string;
  scannerMap: Record<string, any>;
}

const initialState = {
  scannerKey: '',
  scannerMap: {},
} as IScannerState;
/**
 * @description commonSlice
 */
export const scannerSlice = createSlice({
  name: 'inbound',
  initialState: initialState,
  reducers: {
    setScannerKey: (state, action: PayloadAction<string>) => {
      state.scannerKey = action.payload;
    },
    setScannerMap: (state, action) => {
      // 每次扫码前传递一个唯一的key，扫码之后设置key的值之后重置key
      if (state.scannerKey) {
        state.scannerMap[state.scannerKey] = action.payload;
        state.scannerKey = '';
      }
    },
    resetScannerValue: (state, action: PayloadAction<string>) => {
      state.scannerMap[action.payload] = ''
    }
  },
});

export const { setScannerKey, setScannerMap, resetScannerValue } = scannerSlice.actions;

export default scannerSlice.reducer;
