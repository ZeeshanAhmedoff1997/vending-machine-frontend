import React, { useEffect } from "react";
import { validateUser, getUserImage } from "services/auth";
import { useAppDispatch } from "redux/hooks";
import { addUser, updateUserImage } from "redux/userSlice";
import { API_URL } from "constants";

const access_token = "access-token";

const App = ({ children }) => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    const getUser = async () => {
      if (localStorage.getItem(access_token)) {
        const { data } = await validateUser();
        appDispatch(addUser(data.data));
        const res = await getUserImage();
        appDispatch(updateUserImage(API_URL + res.data));
      }
    };
    getUser();
  }, [appDispatch]);
  return <div>{children}</div>;
};

export default App;
