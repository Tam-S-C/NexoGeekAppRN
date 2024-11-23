import { createSlice } from "@reduxjs/toolkit";

export const favsSlice = createSlice({
  name: "favs",
  initialState: {
    value: [], 
  },
  reducers: {
    setFavs: (state, action) => {
      state.value = action.payload; 
    },
    addFav: (state, action) => {
      const exists = state.value.some(fav => fav.id === action.payload.id);
      if (!exists) {
        state.value = [...state.value, action.payload];
      }
    },
    removeFav: (state, action) => {
      state.value = state.value.filter(fav => fav.id !== action.payload);
    },
  },
});


export const { setFavs, addFav, removeFav } = favsSlice.actions;


export default favsSlice.reducer;
