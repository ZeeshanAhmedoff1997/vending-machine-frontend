import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProducts: [],
};

export const userProductSlice = createSlice({
  name: "user_products",
  initialState,
  reducers: {
    addProduct: (state, { payload } = action) => {
      state.userProducts.push(payload);
    },
    updateProduct: (state, { payload } = action) => {},
    removeProduct: (state, { paylaod } = action) => {},
    setProducts: (state, { payload } = action) => {
      state.userProducts = payload;
    },
  },
});

export const { addProduct, updateProduct, removeProduct, setProducts } =
  userProductSlice.actions;

export default userProductSlice.reducer;
