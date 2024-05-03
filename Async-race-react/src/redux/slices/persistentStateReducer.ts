import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SortBy, SortingOrder } from '../../types';

interface PersistentState {
  inputCreate: { color: string; brand: string } | null;
  inputUpdate: { color: string; brand: string } | null;
  currentPageGarage: number;
  currentPageWinners: number;
  carsPositions: Record<number, number | undefined>;
  startRace: boolean;
  velocity: Record<number, number | undefined>;
  distance: Record<number, number | undefined>;
  statuses: Record<number, number | undefined>;
  movingCars: Record<number, boolean | undefined>;
  sortingBy: SortBy | undefined;
  sortingOrder: SortingOrder | undefined;
}

const initialState: PersistentState = {
  inputCreate: null,
  inputUpdate: null,
  currentPageGarage: 1,
  currentPageWinners: 1,
  carsPositions: {},
  startRace: false,
  velocity: {},
  distance: {},
  statuses: {},
  movingCars: {},
  sortingBy: undefined,
  sortingOrder: undefined,
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
    setCurrentPageGarage: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentPageGarage: action.payload,
      };
    },
    setCurrentPageWinners: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentPageWinners: action.payload,
      };
    },
    setCarsPositions: (
      state,
      action: PayloadAction<
        | {
            id: number;
            position: number | undefined;
          }
        | Record<string, never>
      >
    ) => {
      if (Object.keys(action.payload).length === 0) {
        return { ...state, carsPositions: {} };
      }
      const { id, position } = action.payload;
      const newPositions = { ...state.carsPositions };
      if (position === undefined) {
        delete newPositions[id];
      } else {
        newPositions[id] = position;
      }
      return { ...state, carsPositions: newPositions };
    },
    setStartRace: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        startRace: action.payload,
      };
    },
    setVelocity: (
      state,
      action: PayloadAction<
        { id: number; velocity: number | undefined } | Record<string, never>
      >
    ) => {
      if (Object.keys(action.payload).length === 0) {
        return { ...state, velocity: {} };
      }
      const { id, velocity } = action.payload;
      const newVelocity = { ...state.velocity };
      if (velocity === undefined) {
        delete newVelocity[id];
      } else {
        newVelocity[id] = velocity;
      }
      return { ...state, velocity: newVelocity };
    },
    setDistance: (
      state,
      action: PayloadAction<
        { id: number; distance: number | undefined } | Record<string, never>
      >
    ) => {
      if (Object.keys(action.payload).length === 0) {
        return { ...state, distance: {} };
      }
      const { id, distance } = action.payload;
      const newDistance = { ...state.distance };
      if (distance === undefined) {
        delete newDistance[id];
      } else {
        newDistance[id] = distance;
      }
      return { ...state, distance: newDistance };
    },
    setStatuses: (
      state,
      action: PayloadAction<
        { id: number; status: number | undefined } | Record<string, never>
      >
    ) => {
      if (Object.keys(action.payload).length === 0) {
        return { ...state, statuses: {} };
      }
      const { id, status } = action.payload;
      const newStatuses = { ...state.statuses };
      if (status === undefined) {
        delete newStatuses[id];
      } else {
        newStatuses[id] = status;
      }
      return { ...state, statuses: newStatuses };
    },
    setMovingCars: (
      state,
      action: PayloadAction<
        { id: number; isMoving: boolean | undefined } | Record<string, never>
      >
    ) => {
      if (Object.keys(action.payload).length === 0) {
        return { ...state, movingCars: {} };
      }
      const { id, isMoving } = action.payload;
      const newMovingCars = { ...state.movingCars };
      if (isMoving === undefined) {
        delete newMovingCars[id];
      } else {
        newMovingCars[id] = isMoving;
      }
      return { ...state, movingCars: newMovingCars };
    },
    setSortingBy: (state, action: PayloadAction<SortBy>) => {
      return {
        ...state,
        sortingBy: action.payload,
      };
    },
    setSortingOrder: (state, action: PayloadAction<SortingOrder>) => {
      return {
        ...state,
        sortingOrder: action.payload,
      };
    },
  },
});

export const {
  setInputCreate,
  setInputUpdate,
  setCurrentPageGarage,
  setCurrentPageWinners,
  setCarsPositions,
  setStartRace,
  setVelocity,
  setDistance,
  setStatuses,
  setMovingCars,
  setSortingBy,
  setSortingOrder,
} = persistentStateReducer.actions;
export default persistentStateReducer.reducer;
