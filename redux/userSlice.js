import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addUser: (state, { payload } = action) => {
      state.user = payload;
    },
    updateUser: (state, { payload } = action) => {
      state.user = payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
