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
      state.user.email = payload.email;
      state.user.name = payload.name;
      state.user.role = payload.role;
    },
    removeUser: (state) => {
      state.user = null;
    },
    updateUserImage: (state, { payload } = action) => {
      state.user.image = payload;
    },
  },
});

export const { addUser, updateUser, removeUser, updateUserImage } =
  userSlice.actions;

export default userSlice.reducer;
