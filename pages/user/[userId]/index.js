import { Layout } from "components/account/Layout";
import React from "react";
import AuthenticatedRoute from "../../../components/hoc/AuthenticatedRoute";
import { useSelector } from "react-redux";
import UserDetails from "components/user/UserDetails";

const UserInfo = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Layout col={6} offst={3}>
      <UserDetails user={user} />
    </Layout>
  );
};
// export default UserInfo;
export default AuthenticatedRoute(UserInfo, {
  pathAfterFailure: "/auth/login",
});
