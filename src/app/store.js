import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieSlice'
import theaterReducer from './theaterSlice'
import toolReducer from './toolSlice'
import showReducer from './showSlice'
import userReducer from './userSlice'
import searchReducer from './searchSlice'

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    show: showReducer,
    theater: theaterReducer,
    tool: toolReducer,
    user: userReducer,
    search: searchReducer
  },
});
