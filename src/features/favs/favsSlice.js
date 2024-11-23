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
      state.value.push(action.payload); 
    },
    removeFav: (state, action) => {
      state.value = state.value.filter(fav => fav.id !== action.payload); // Elimina un favorito
    },
  },
});


export const { setFavs, addFav, removeFav } = favsSlice.actions;


export default favsSlice.reducer;
