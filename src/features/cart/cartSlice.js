import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "../../utils/functions";


export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      cartItems: [],
      user: "demo",
      total: 0,
      cartLength: 0,
      updatedAt: new Date().toLocaleString(),
    },
  },
  reducers: {
    addItem: (state, action) => {
      const itemInCart = state.value.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (!itemInCart) {
        state.value.cartItems.push({ ...action.payload, quantity: 1 });
        state.value.cartLength += 1;
      } else {
        itemInCart.quantity += 1;
      }

      state.value.total = calculate_total_price(state.value.cartItems);
      state.value.updatedAt = new Date().toLocaleString();
    },

    removeItem: (state, action) => {
      state.value.cartItems = state.value.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.value.cartLength = state.value.cartItems.length;
      state.value.total = calculate_total_price(state.value.cartItems);
      state.value.updatedAt = new Date().toLocaleString();
    },

    clearCart: (state) => {
      state.value.cartItems = [];
      state.value.total = 0;
      state.value.cartLength = 0;
      state.value.updatedAt = new Date().toLocaleString();
    },

    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.value.cartItems.find(item => item.id === id);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.value.total = calculate_total_price(state.value.cartItems);
        state.value.updatedAt = new Date().toLocaleString();
      }
    },

    increaseQuantity: (state, action) => {
      const { id, stock } = action.payload;
      const item = state.value.cartItems.find(item => item.id === id);

      if (item && item.quantity < stock) {
        item.quantity += 1;
        state.value.total = calculate_total_price(state.value.cartItems);
        state.value.updatedAt = new Date().toLocaleString();
      }
    },


  },
});

export const { addItem, removeItem, clearCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;

