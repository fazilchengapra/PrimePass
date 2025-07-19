import { createSlice } from "@reduxjs/toolkit";

const toolSlice = createSlice({
  name: "tool",
  initialState: {
    tool: null,
  },
  reducers: {
    setTools: (state, action) => {
        state.tool = action.payload
    },
    clearTool: (state, action) =>  {
        state.tool = null
    }
  }
});

export const {setTools, clearTool} = toolSlice.actions;
export default toolSlice.reducer;
