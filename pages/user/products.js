import React, { useEffect, useState } from "react";
import AuthenticatedRoute from "../../components/hoc/AuthenticatedRoute";
import { getUserProducts } from "services/product";
import { Layout } from "components/account/Layout";
import UserProducts from "components/user/UserProducts";
import { useSelector } from "react-redux";
import { setProducts } from "redux/userProductsSlice";
import { useAppDispatch } from "redux/hooks";

const UserProductContainer = () => {
  const { userProducts: products } = useSelector((state) => state.userProducts);
  const { user } = useSelector((state) => state.user);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    const userProducts = async () => {
      const { data } = await getUserProducts();
      appDispatch(setProducts(data));
    };
    userProducts();
  }, [appDispatch]);

  return (
    <Layout col={10} offst={1}>
      <UserProducts products={products} user={user} />
    </Layout>
  );
};

export default AuthenticatedRoute(UserProductContainer, { role: "seller" });
