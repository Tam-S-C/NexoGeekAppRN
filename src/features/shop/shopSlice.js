import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    value: {
      categorySelected: "",
      eventId: null,
    },
  },
  reducers: {
    setCategory: (state, action) => {
      state.value.categorySelected = action.payload;
    },
    setEventId: (state, action) => {
      state.value.eventId = action.payload;
    },
  },
});

export const { setCategory, setEventId } = shopSlice.actions;

export default shopSlice.reducer;
