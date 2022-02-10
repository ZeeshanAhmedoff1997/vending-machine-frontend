import { configureStore } from "@reduxjs/toolkit";
import userReducer from "redux/userSlice";
import userProductReducer from "redux/userProductsSlice";
import productReducer from "redux/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userProducts: userProductReducer,
    products: productReducer,
  },
});
