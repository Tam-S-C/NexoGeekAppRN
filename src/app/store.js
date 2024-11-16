import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from '../services/shopService';
import shopReducer from '../features/shop/shopSlice';

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    shopReducer: shopReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});
