import { createSlice } from "@reduxjs/toolkit";

const theaterSlice = createSlice({
  name: "theater",
  initialState: {
    theater: null,
  },
  reducers: {
    setTheater: (state, action) => {
      state.theater = action.payload;
    },
    clearTheater: (state) => {
      state.theater = null;
    },
  },
});

export const { setTheater, clearTheater } = theaterSlice.actions;
export default theaterSlice.reducer;
