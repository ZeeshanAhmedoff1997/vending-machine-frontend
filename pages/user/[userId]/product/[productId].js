import { Layout } from "components/account/Layout";
import React, { useState, useEffect } from "react";
import AuthenticatedRoute from "components/hoc/AuthenticatedRoute";
import { useSelector } from "react-redux";
import ProductDetails from "components/product/ProductDetails";
import { useRouter } from "next/router";
import { getProduct } from "../../../../services/product";

const PorductInfo = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const productId = router.query.productId;

  useEffect(() => {
    const getproductdetails = async () => {
      const { data } = await getProduct(productId);
      setProduct(data);
    };
    getproductdetails();
  }, [productId]);
  return (
    <Layout col={6} offst={3}>
      {product && <ProductDetails user={user} product={product} />}
    </Layout>
  );
};

export default AuthenticatedRoute(PorductInfo, { role: "seller" });
