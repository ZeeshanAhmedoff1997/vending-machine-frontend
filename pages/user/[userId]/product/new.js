import React from "react";
import { Layout } from "components/account/Layout";
import AddProduct from "components/product/AddProduct";
import AuthenticatedRoute from "components/hoc/AuthenticatedRoute";

const UserAddProduct = (_) => {
  return (
    <Layout col={6} offst={3}>
      <AddProduct />
    </Layout>
  );
};

export default AuthenticatedRoute(UserAddProduct, { role: "seller" });
