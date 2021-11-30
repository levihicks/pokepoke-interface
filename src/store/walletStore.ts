import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './';

interface WalletState {
  walletAddress: string | null;
}

const initialState: WalletState = {
  walletAddress: null,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string | null>) => {
      state.walletAddress = action.payload;
    },
  },
});

export const { setWalletAddress } = walletSlice.actions;

export const selectWalletAddress = (state: RootState) =>
  state.wallet.walletAddress;

export default walletSlice.reducer;
