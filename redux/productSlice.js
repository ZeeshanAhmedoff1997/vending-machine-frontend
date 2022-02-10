import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductQuantity: (state, { payload } = action) => {
      const index = state.products.findIndex((el) => el.id === payload.id);
      state.products[index].quantity = payload.quantity;
    },
    setProducts: (state, { payload } = action) => {
      state.products = payload;
    },
  },
});

export const { updateProductQuantity, setProducts } = productSlice.actions;

export default productSlice.reducer;
