import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    selectedMovie: null,
  },
  reducers: {
    setMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    clearMovie: (state) => {
      state.selectedMovie = null;
    },
  },
});

export const { setMovie, clearMovie } = movieSlice.actions;
export default movieSlice.reducer;
