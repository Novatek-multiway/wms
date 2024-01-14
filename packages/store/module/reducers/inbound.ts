import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IInboundState {
  inboundSelections: API.OutputReceiptLineInfoDTO[];
}

const initialState = {
  inboundSelections: [],
} as IInboundState;
/**
 * @description commonSlice
 */
export const inboundSlice = createSlice({
  name: 'inbound',
  initialState: initialState,
  reducers: {
    setInboundSelections: (state, action: PayloadAction<API.OutputReceiptLineInfoDTO[]>) => {
      state.inboundSelections = action.payload;
    },
  },
});

export const { setInboundSelections } = inboundSlice.actions;

export default inboundSlice.reducer;
