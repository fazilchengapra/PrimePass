import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'
import theaterReducer from './theaterSlice'
import toolReducer from './toolSlice'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    theater: theaterReducer,
    tool: toolReducer
  },
});
