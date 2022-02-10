import React from "react";
import { Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";
import NoProduct from "public/no-product-found.png";
import CustomImage from "../common/Image";
import { productAvatar } from "public/backet.jpg";
import { API_URL } from "constants";

const SellerDashboard = ({ products }) => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <Alert variant="info">
          You are Watching all Seller Products. But you Cannot Buy them
        </Alert>
      </div>
      <div className="d-flex row">
        {products.map((product, key) => (
          <Card style={{ width: "18rem" }} key={key} className="m-3">
            <Card.Header>Featured</Card.Header>
            <Card.Img
              variant="top"
              src={product.image ? API_URL + product.image : productAvatar}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                height: "200px",
              }}
            />
            <Card.Body>
              <Card.Title className="text-center">{product.name}</Card.Title>
              <Card.Text className="text-center">
                <h6> Quantity: {product.quantity}</h6>
                <h6> price: {product.cost} $</h6>
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
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
  );
};

export default SellerDashboard;
