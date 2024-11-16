import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from '../services/shopService';
import shopReducer from '../features/shop/shopSlice';
import cartReducer from '../features/cart/cartSlice';


export const store = configureStore({
  reducer: {
    [shopApi.reducerPath] : shopApi.reducer,
    shopReducer,
    cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
})

