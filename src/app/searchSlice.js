import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    tool: null,
    filters: {
      genre: "",
      year: "",
      language: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    clearTool: (state) => {
      state.tool = null;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { genre: "", year: "", language: "" };
    },
  },
});

export const {setTool, clearTool, setFilter, clearFilters} = searchSlice.actions
export default searchSlice.reducer
