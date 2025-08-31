import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'
import theaterReducer from './theaterSlice'
import showReducer from './showSlice'
import userReducer from './userSlice'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    show: showReducer,
    theater: theaterReducer,
    user: userReducer,
    search: searchReducer
  },
});
