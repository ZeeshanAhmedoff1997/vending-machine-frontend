import Axios from "axios";
import { API_URL } from "constants";
const apiEndpoint = API_URL + "/user/auth/";
const client = "client";
const uid = "uid";
const access_token = "access-token";

const setTokens = () => {
  try {
    Axios.defaults.headers.common[client] = localStorage.getItem(client);
    Axios.defaults.headers.common[uid] = localStorage.getItem(uid);
    Axios.defaults.headers.common[access_token] =
      localStorage.getItem(access_token);
    Axios.defaults.headers.common["Accept"] =
      "application/vnd.dp; version=1,application/jsonGET";
  } catch (ex) {}
};

setTokens();

export const signup = (values) => {
  return Axios.post(apiEndpoint + "", values);
};

export const signin = async (values) => {
  const { data, headers } = await Axios.post(apiEndpoint + "sign_in", values);
  localStorage.setItem(client, headers[client]);
  localStorage.setItem(uid, headers[uid]);
  localStorage.setItem(access_token, headers[access_token]);
  localStorage.setItem("id", data.data.id);
  return data;
};

export const validateUser = () => {
  return Axios.get(apiEndpoint + "/validate_token");
};

export const logout = () => {
  delete Axios.defaults.headers.common[access_token];
  localStorage.removeItem(access_token);
};
