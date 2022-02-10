import React from "react";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import NoProduct from "public/no-product-found.png";
import CustomImage from "../common/Image";
import { useRouter } from "next/router";
import { productAvatar } from "public/backet.jpg";
import { API_URL } from "constants";
import { showConifrmAlert } from "utils/alert";
import { toast } from "react-toastify";
import { deleteUserProduct } from "services/product";

const UserProducts = ({ products, user }) => {
  const router = useRouter();

  const newProductClick = () => {
    router.push(`/user/${user.id}/product/new`);
  };

  const onDeleteClick = async (id) => {
    await showConifrmAlert(
      "Are you Sure?",
      "Your Product will be permenantly deleted."
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUserProduct(id);
          toast.success("Successfully deleted");
          router.push("/");
        } catch (err) {
          toast.error("Unable to delete");
        }
      }
    });
  };

  const onEditClick = (id) => {
    router.push(`/user/${user.id}/product/${id}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <Button variant="outline-primary" onClick={newProductClick}>
          Add New Product
        </Button>
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
              <div className="d-flex justify-content-evenly">
                <Button
                  variant="primary"
                  onClick={() => onEditClick(product.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onDeleteClick(product.id)}
                >
                  Delete
                </Button>
              </div>
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

export default UserProducts;
