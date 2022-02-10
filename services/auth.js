import Axios from "axios";
import { API_URL } from "constants";
const apiEndpoint = API_URL + "/user/auth/";
const client = "client";
const uid = "uid";
const access_token = "access-token";

export const setTokens = () => {
  console.log("set token is called");
  try {
    Axios.defaults.headers.common[client] = localStorage.getItem(client);
    Axios.defaults.headers.common[uid] = localStorage.getItem(uid);
    Axios.defaults.headers.common[access_token] =
      localStorage.getItem(access_token);
    Axios.defaults.headers.common["Accept"] =
      "application/vnd.dp; version=1,application/jsonGET";
  } catch (ex) {}
};

const saveTokens = (headers, data) => {
  localStorage.setItem(client, headers[client]);
  localStorage.setItem(uid, headers[uid]);
  localStorage.setItem(access_token, headers[access_token]);
  localStorage.setItem("id", data.data.id);
  setTokens();
  return data;
};

export const signup = async (values) => {
  const { data, headers } = await Axios.post(apiEndpoint + "", values);
  return saveTokens(headers, data);
};

export const signin = async (values) => {
  const { data, headers } = await Axios.post(apiEndpoint + "sign_in", values);
  return saveTokens(headers, data);
};

export const updateuser = (values) => {
  return Axios.put(apiEndpoint + "", values);
};

export const getUserImage = () => {
  return Axios.get(API_URL + "/api/v1/profile/image");
};

export const deleteUser = () => {
  return Axios.delete(apiEndpoint);
};

export const validateUser = async () => {
  return await Axios.get(apiEndpoint + "validate_token");
};

export const logout = () => {
  delete Axios.defaults.headers.common[access_token];
  localStorage.removeItem(access_token);
};
