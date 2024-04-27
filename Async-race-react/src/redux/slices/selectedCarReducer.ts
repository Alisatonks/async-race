import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Car } from '../../types';

interface SelectedCarState {
  selectedCar: Car | null;
}

const initialState: SelectedCarState = {
  selectedCar: null,
};

export const selectedCarReducer = createSlice({
  name: 'selectedCar',
  initialState,
  reducers: {
    setSelectedCar: (state, action: PayloadAction<Car | null>) => {
      return {
        ...state,
        selectedCar: action.payload,
      };
    },
  },
});

export const { setSelectedCar } = selectedCarReducer.actions;
export default selectedCarReducer.reducer;
