import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, ButtonGroup, ToggleButton } from "react-bootstrap";
import { Card, ListGroup, Badge } from "react-bootstrap";
import NoProduct from "public/no-product-found.png";
import CustomImage from "../common/Image";
import { productAvatar } from "public/backet.jpg";
import { API_URL } from "constants";
import { useSelector } from "react-redux";
import { showDeposit, addDeposit, resetDeposit } from "services/user";
import { buyProduct } from "services/product";
import { useAppDispatch } from "redux/hooks";
import { updateDeposit, updateChange, resetChange } from "redux/userSlice";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import classNames from "classnames";
import ConifrmationModal from "./ConfirmBuyModal";
import { useRouter } from "next/router";
import { updateProductQuantity } from "redux/productSlice";

const BuyerDashboard = ({ products }) => {
  const { deposit, change } = useSelector((state) => state.user);
  const coins = [5, 10, 20, 50, 100];
  const appDispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getDeposit = async () => {
      const { data } = await showDeposit();
      appDispatch(updateDeposit(data.amount));
    };
    getDeposit();
  }, [appDispatch]);

  const onDepositClick = async (amount) => {
    setLoading(true);
    try {
      const { data } = await addDeposit({ deposit: amount });
      appDispatch(updateDeposit(data.amount));
    } catch (ex) {
      toast.error("unable to add deposit");
    } finally {
      setLoading(false);
    }
  };

  const onDepositResetClick = async () => {
    setLoading(true);
    try {
      const { data } = await resetDeposit();
      appDispatch(updateChange(data.change));
      appDispatch(updateDeposit(0));
      toast.success(
        "You have Successfully Reset the Deposit. Withdraw your change, Enjoy!"
      );
    } catch (ex) {
      toast.error("unable to Delete deposit");
    } finally {
      setLoading(false);
    }
  };

  const onBuyClick = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const withDrawChange = useCallback(() => {
    appDispatch(resetChange());
    toast.success("Enjoy your Change");
  }, [appDispatch]);

  const onBuy = async (quantity) => {
    setLoading(true);
    try {
      const { data } = await buyProduct(selectedProduct.id, {
        quantity: quantity,
      });
      appDispatch(updateChange(data.change));
      appDispatch(updateDeposit(0));
      appDispatch(updateProductQuantity(data.product));
      router.push("/");
      toast.success(
        `Congratulations You bought ${data.product.name} Successfully with ${data.spent} cents. Check your Change Section to get Change`
      );
    } catch (err) {
      toast.error(err.response.data.user[0]);
    } finally {
      setLoading(false);
      setIsOpen(false);
      setSelectedProduct(null);
    }
  };

  const renderChangeSection = useMemo(() => {
    return (
      <>
        <h2 className="border text-center mt-2">Change Section</h2>
        <div className="border-info">
          {Object.keys(change).map((coin, key) => (
            <ListGroup as="ol" numbered key={key}>
              <ListGroup.Item
                className={classNames(
                  "d-flex justify-content-between align-items-start",
                  { "bg-warning": change[coin] > 0 }
                )}
              >
                <div className="ms-2 me-auto">{coin} cent coins in Change</div>
                <Badge variant="primary" pill>
                  {change[coin]}
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </div>
        <div className="d-flex justify-content-center mt-2">
          <Button variant="outline-info" onClick={withDrawChange}>
            Withdraw Change
          </Button>
        </div>
      </>
    );
  }, [change, withDrawChange]);

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="d-flex justify-content-center">
          <Alert variant="warning">
            Enjoy !!!! The Items are in Best Prices Your Account Deposit is{" "}
            <b>{deposit} cents</b>
          </Alert>
        </div>
        <div className="d-flex row">
          {products.map((product, key) => (
            <Card
              style={{ width: "10rem" }}
              key={key}
              className="position-relative overflow-hidden"
            >
              {product.quantity === 0 && (
                <div className="ribbon ribbon-top-right">
                  <span className="ribbon-span">Out of Stock</span>
                </div>
              )}
              <Card.Header className="text-center">{product.name}</Card.Header>
              <Card.Img
                variant="top"
                src={product.image ? API_URL + product.image : productAvatar}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  height: "100px",
                }}
              />
              <Card.Body>
                <Card.Title className="text-center">{product.name}</Card.Title>
                <div className="text-center">
                  <p className="text-secondary">
                    {" "}
                    Available: {product.quantity}
                  </p>
                  <p className="text-info"> price: {product.cost} $</p>
                </div>
                <Button
                  variant="primary"
                  disabled={deposit < product.cost || product.quantity === 0}
                  onClick={() => onBuyClick(product)}
                  product={selectedProduct}
                >
                  Buy {product.name}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
        {selectedProduct && (
          <ConifrmationModal
            show={isOpen}
            onHide={() => setIsOpen(false)}
            onBuy={(q) => onBuy(q)}
            product={selectedProduct}
          />
        )}
        {products.length === 0 && (
          <div className="d-flex justify-content-center">
            <CustomImage
              src={NoProduct}
              width={300}
              height={300}
              alt="No Product Avaialble"
            />
          </div>
        )}
      </div>
      <div className={`col-md-3`}>
        <h2 className="border text-center mt-2">Deposit Amout</h2>
        <div className="border-info">
          {coins.map((coin, key) => (
            <Button
              variant="outline-info m-2"
              key={key}
              onClick={() => onDepositClick(coin)}
              disabled={loading}
            >
              {coin} Cent
            </Button>
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <Button
            variant="outline-danger"
            onClick={() => onDepositResetClick()}
          >
            Reset Deposit
          </Button>
        </div>
        {renderChangeSection}
      </div>
    </div>
  );
};

export default BuyerDashboard;
