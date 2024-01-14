import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IInboundState {
  invoiceRecord: API.OutputInvoiceLineDTO | null;
}

const initialState = {
  invoiceRecord: null,
} as IInboundState;
/**
 * @description commonSlice
 */
export const outboundSlice = createSlice({
  name: 'inbound',
  initialState: initialState,
  reducers: {
    setInvoiceRecord: (state, action: PayloadAction<API.OutputInvoiceLineDTO | null>) => {
      state.invoiceRecord = action.payload;
    },
  },
});

export const { setInvoiceRecord } = outboundSlice.actions;

export default outboundSlice.reducer;
