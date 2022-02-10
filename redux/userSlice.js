import { createSlice } from "@reduxjs/toolkit";

const defaultChange = {
  5: 0,
  10: 0,
  20: 0,
  50: 0,
  100: 0,
};

const initialState = {
  user: null,
  deposit: 0,
  change: defaultChange,
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
    updateDeposit: (state, { payload } = action) => {
      state.deposit = payload;
    },
    updateChange: (state, { payload } = action) => {
      state.change = payload;
    },
    resetChange: (state) => {
      state.change = defaultChange;
    },
  },
});

export const {
  addUser,
  updateUser,
  removeUser,
  updateUserImage,
  updateDeposit,
  updateChange,
  resetChange,
} = userSlice.actions;

export default userSlice.reducer;
