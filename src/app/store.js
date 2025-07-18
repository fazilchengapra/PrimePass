import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'
import theaterReducer from './theaterSlice'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    theater: theaterReducer
  },
});
