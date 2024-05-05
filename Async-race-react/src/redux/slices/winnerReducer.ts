import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Finisher } from '../../types';

interface WinnerState {
  winner: Finisher | null;
}

const initialState: WinnerState = {
  winner: null,
};

export const winnerReducer = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    setWinner: (state, action: PayloadAction<Finisher | null>) => {
      return {
        ...state,
        winner: action.payload,
      };
    },
  },
});

export const { setWinner } = winnerReducer.actions;
export default winnerReducer.reducer;
