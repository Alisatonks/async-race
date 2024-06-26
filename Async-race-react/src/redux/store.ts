import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { requestsApi } from './slices/requestsApi';
import { selectedCarReducer } from './slices/selectedCarReducer';
import { persistentStateReducer } from './slices/persistentStateReducer';
import { errorReducer } from './slices/errorReducer';
import { winnerReducer } from './slices/winnerReducer';

const rootReducer = combineReducers({
  requestsApi: requestsApi.reducer,
  selectedCar: selectedCarReducer.reducer,
  persistentState: persistentStateReducer.reducer,
  error: errorReducer.reducer,
  winner: winnerReducer.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(requestsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export default store;
