import { Layout } from "components/account/Layout";
import Head from "next/head";
import { useSelector } from "react-redux";
import { isBuyer, isSeller } from "../utils/alert";
import BuyerDashboard from "components/dashboard/BuyerDashboard";
import SellerDashboard from "components/dashboard/SellerDashboard";
import { getProducts } from "services/product";
import React, { useEffect } from "react";
import { setProducts } from "redux/productSlice";
import { useAppDispatch } from "redux/hooks";

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    const retrieveProducts = async () => {
      const { data } = await getProducts();
      appDispatch(setProducts(data));
    };
    retrieveProducts();
  }, [appDispatch]);

  return (
    <div>
      <Head>
        <title>Vending Machine</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      {user && isBuyer(user) && (
        <Layout col={12} offst={0}>
          <BuyerDashboard products={products} />
        </Layout>
      )}
      {user && isSeller(user) && (
        <Layout col="10" offst="2">
          <SellerDashboard products={products} />
        </Layout>
      )}
    </div>
  );
}
