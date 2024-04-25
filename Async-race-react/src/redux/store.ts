import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { carsApi } from './slices/carsSlice';
import { selectedCarReducer } from './slices/selectedCarReducer';

const rootReducer = combineReducers({
  carsApi: carsApi.reducer,
  selectedCar: selectedCarReducer.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export default store;
