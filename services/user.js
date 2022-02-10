import Axios from "axios";
import { API_URL } from "constants";
import { setTokens } from "./auth";
const apiEndpoint = API_URL + "/api/v1/";
setTokens();

export const showDeposit = () => {
  return Axios.get(apiEndpoint + "user/deposit");
};

export const addDeposit = (values) => {
  return Axios.patch(apiEndpoint + "user/deposit", values);
};

export const resetDeposit = () => {
  return Axios.delete(apiEndpoint + "user/deposit");
};
