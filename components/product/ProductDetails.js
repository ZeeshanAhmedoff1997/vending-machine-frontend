import React, { useState } from "react";
import CustomImage from "../common/Image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import classNames from "classnames";
import { updateUserProduct } from "services/product";
import { toast } from "react-toastify";
import { API_URL } from "constants";
import { productAvatar } from "public/backet.jpg";
import { useRouter } from "next/router";

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const id = product.id;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    quantity: Yup.number()
      .typeError("Must be Number")
      .min(0, "Too Little")
      .max(50000, "Too costly")
      .required("Quantity is required"),
    cost: Yup.number()
      .typeError("Must be Number")
      .min(0, "Too Little")
      .max(50000, "Too costly")
      .required("Price of Product is required"),
  });

  const defaultValues = {
    name: product?.name || "",
    cost: product.cost,
    quantity: product.quantity,
  };
  const [isEdit, setIsEdit] = useState(false);

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues,
  };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (product) => {
    try {
      const { cost, image, name, quantity } = product;
      const formData = new FormData();
      if (image[0]) {
        formData.append("image", image[0]);
      }
      formData.append("cost", cost);
      formData.append("name", name);
      formData.append("quantity", quantity);
      const { data } = await updateUserProduct(id, formData);
      debugger;
      toast.success("Product Updated Successfully");
      router.push("/user/products");
    } catch (ex) {
      console.log("ex", ex.response);
      debugger;
      toast.error(ex.response?.data?.errors || "Internal Error");
    } finally {
      setIsEdit(false);
    }
  };

  const onEditClick = () => {
    setIsEdit(true);
  };

  const { name, cost, quantity } = errors;

  return (
    <div className="user-details mt-2 border-info">
      <div className="row d-flex justify-content-center mt-2">
        <CustomImage
          width={100}
          height={100}
          src={product.image ? API_URL + product.image : productAvatar}
          alt="product_pic"
          className="rounded-circle"
        />
      </div>
      <div className="d-flex justify-content-center mb-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-30 mt-2">
            <input
              className="form-control form-control-sm"
              id="formFileSm"
              type="file"
              name="image"
              {...register("image")}
            />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              {...register("name")}
              className={classNames("form-control", { [`is-invalid`]: name })}
              disabled={!isEdit}
            />
            <div className="invalid-feedback">{name?.message}</div>
          </div>
          <div className="form-group mt-2">
            <label>Quantity</label>
            <input
              name="quantity"
              type="number"
              {...register("quantity")}
              className={classNames("form-control", {
                [`is-invalid`]: quantity,
              })}
              disabled={!isEdit}
            />
            <div className="invalid-feedback">{quantity?.message}</div>
          </div>
          <div className="form-group mt-2">
            <label>Price</label>
            <input
              name="cost"
              type="number"
              {...register("cost")}
              className={classNames("form-control", {
                [`is-invalid`]: cost,
              })}
              disabled={!isEdit}
            />
            <div className="invalid-feedback">{cost?.message}</div>
          </div>
          <div className="d-flex justify-content-evenly">
            {!isEdit && (
              <button
                disabled={formState.isSubmitting}
                className="btn btn-primary mt-2"
                type="button"
                onClick={onEditClick}
              >
                Edit
              </button>
            )}
            {isEdit && (
              <button
                disabled={formState.isSubmitting}
                className="btn btn-primary mt-2"
              >
                {formState.isSubmitting && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                {formState.isSubmitting ? "Updating" : "Update"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
