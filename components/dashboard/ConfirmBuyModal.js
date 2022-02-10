import React, { useState } from "react";
import {
  Modal,
  Button,
  ButtonGroup,
  ToggleButton,
  Alert,
} from "react-bootstrap";

const ConifrmationModal = ({ show, onHide, onBuy, product }) => {
  const [buyQuantity, setBuyQuantity] = useState(1);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Purchase
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {buyQuantity === 0 && (
          <Alert variant="warning">
            Your Buying Quantity is <b>0</b>. Please Increase the Quantity
          </Alert>
        )}
        You want to Buy <b className="text-primary">{product.name}</b>. That
        will Cost you{" "}
        <b className="text-info">{product.cost * buyQuantity} cents</b>
        <h6>
          Quantity = <b>{buyQuantity}</b>
        </h6>
        <ButtonGroup>
          <ToggleButton
            type="button"
            className="outline-success"
            onClick={() => setBuyQuantity(buyQuantity + 1)}
          >
            +
          </ToggleButton>
          <ToggleButton
            type="button"
            className="outline-danger"
            onClick={() => setBuyQuantity(buyQuantity - 1)}
          >
            -
          </ToggleButton>
        </ButtonGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-success"
          onClick={() => onBuy(buyQuantity)}
          disabled={buyQuantity === 0}
        >
          Buy {buyQuantity} {product.name}
        </Button>
        <Button onClick={onHide} variant="outline-danger">
          Cancel Purchase
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConifrmationModal;
