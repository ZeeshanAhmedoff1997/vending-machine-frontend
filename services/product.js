import Axios from "axios";
import { API_URL } from "constants";
import { setTokens } from "./auth";
const apiEndpoint = API_URL + "/api/v1/";
setTokens();

export const getUserProducts = () => {
  return Axios.get(apiEndpoint + "user/products");
};

export const addUserProduct = (values) => {
  return Axios.post(apiEndpoint + "/products", values);
};

export const updateUserProduct = (id, values) => {
  return Axios.put(apiEndpoint + `products/${id}`, values);
};

export const deleteUserProduct = (id) => {
  return Axios.delete(apiEndpoint + `products/${id}`);
};

export const getProduct = (id) => {
  return Axios.get(apiEndpoint + `products/${id}`);
};

export const getProducts = () => {
  return Axios.get(apiEndpoint + "products");
};

export const buyProduct = (id, values) => {
  return Axios.post(apiEndpoint + `products/${id}/buy`, values);
};
