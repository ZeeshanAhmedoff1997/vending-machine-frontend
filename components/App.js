import React, { useEffect } from "react";
import { validateUser } from "services/auth";
import { useAppDispatch } from "redux/hooks";
import { addUser } from "redux/userSlice";

const App = ({ children }) => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    const getUser = async () => {
      const { data } = await validateUser();
      appDispatch(addUser(data.data));
    };
    getUser();
  }, [appDispatch]);
  return <div>{children}</div>;
};

export default App;
