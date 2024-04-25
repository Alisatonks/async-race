import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { carsApi } from './slices/carsSlice';

const store = configureStore({
  reducer: { [carsApi.reducerPath]: carsApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(carsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
