import { createSlice } from "@reduxjs/toolkit";

const showSlice = createSlice({
  name: "show",
  initialState: {
    show: null,
    sltDate: null,
  },
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload;
    },
    clearShow: (state) => {
      state.show = null;
    },
    setSltDate: (state, action) => {
      state.sltDate = action.payload;
    }
  },
});

export const { setShow, clearShow } = showSlice.actions;
export default showSlice.reducer;