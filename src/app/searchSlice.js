import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    tool: null,
    filters: {
      with_genres: [],
      year: "",
      with_original_language: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    clearTool: (state) => {
      return { ...state, tool: null };
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { with_genres: [], year: "", with_original_language: "" };
    },
  },
});

export const { setTool, clearTool, setFilters, clearFilters } =
  searchSlice.actions;
export default searchSlice.reducer;
