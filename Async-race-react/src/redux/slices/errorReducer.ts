import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ErrorState {
  error: string;
}

const initialState: ErrorState = {
  error: '',
};

export const errorReducer = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const { setError } = errorReducer.actions;
export default errorReducer.reducer;
