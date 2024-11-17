import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../services/shopService";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";
import { orderApi } from "../services/ordersService";


export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    shopReducer,
    cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware).concat(orderApi.middleware),
});
