import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  username: null,
  email: null,
  role: "customer", // default
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, username, email, role } = action.payload;
      state._id = _id;
      state.username = username;
      state.email = email;
      state.role = role || "customer";
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state._id = null;
      state.username = null;
      state.email = null;
      state.role = "customer";
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
