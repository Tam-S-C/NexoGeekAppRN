import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../services/shopService";
import { orderApi } from "../services/ordersService";
import { authApi } from "../services/authService";
import { userApi } from "../services/userService";
import { favsApi } from "../services/favsService";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import favsReducer from "../features/favs/favsSlice";


export const store = configureStore({
  reducer: {
    shopReducer,
    cartReducer,
    authReducer,
    favsReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [favsApi.reducerPath]: favsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(shopApi.middleware)
      .concat(orderApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(favsApi.middleware),
});
