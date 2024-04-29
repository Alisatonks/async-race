import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PersistentState {
  inputCreate: { color: string; brand: string } | null;
  inputUpdate: { color: string; brand: string } | null;
}

const initialState: PersistentState = {
  inputCreate: null,
  inputUpdate: null,
};

export const persistentStateReducer = createSlice({
  name: 'persistentState',
  initialState,
  reducers: {
    setInputCreate: (
      state,
      action: PayloadAction<Partial<{ color: string; brand: string }>>
    ) => {
      if (state.inputCreate) {
        return {
          ...state,
          inputCreate: {
            color: action.payload.color ?? state.inputCreate.color,
            brand: action.payload.brand ?? state.inputCreate.brand,
          },
        };
      }
      return {
        ...state,
        inputCreate: {
          color: action.payload.color ?? '',
          brand: action.payload.brand ?? '',
        },
      };
    },
    setInputUpdate: (
      state,
      action: PayloadAction<Partial<{ color: string; brand: string }>>
    ) => {
      if (state.inputUpdate) {
        return {
          ...state,
          inputUpdate: {
            color: action.payload.color ?? state.inputUpdate.color,
            brand: action.payload.brand ?? state.inputUpdate.brand,
          },
        };
      }
      return {
        ...state,
        inputUpdate: {
          color: action.payload.color ?? '',
          brand: action.payload.brand ?? '',
        },
      };
    },
  },
});

export const { setInputCreate, setInputUpdate } =
  persistentStateReducer.actions;
export default persistentStateReducer.reducer;
