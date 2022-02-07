import React, { useState } from "react";
import CustomImage from "./common/Image";
import avatar from "public/img_avatar.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppDispatch } from "redux/hooks";
import classNames from "classnames";

const UserDetails = ({ user }) => {
  console.log("user", user);
  const appDispatch = useAppDispatch();
  const roles = ["seller", "buyer"];

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("Role is required").oneOf(roles),
  });

  const defaultValues = {
    name: user.name || "",
    role: user.role,
    email: user.email,
  };
  const [isEdit, setIsEdit] = useState(false);
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues,
  };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = () => {};
  const { name, password, role, email } = errors;

  const roleOptions = roles.map((role, key) => (
    <option value={role} key={key}>
      {role}
    </option>
  ));

  return (
    <div className="user-details mt-2 border-info">
      <div className="alert alert-info m-2" role="alert">
        You cannot change your email address and password
      </div>

      <div className="row d-flex justify-content-center mt-2">
        <CustomImage
          width={100}
          height={100}
          src={user.image || avatar}
          alt="profile_pic"
          className="rounded-circle"
        />
      </div>
      <div className="d-flex justify-content-center mb-2">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <label>Email</label>
            <input
              name="email"
              type="text"
              {...register("email")}
              className={classNames("form-control", {
                [`is-invalid`]: email,
              })}
              disabled={!isEdit}
            />
            <div className="invalid-feedback">{email?.message}</div>
          </div>
          <div className="form-group mt-2">
            <label>Role</label>
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("role")}
              disabled={!isEdit}
            >
              {roleOptions}
            </select>
          </div>
          <div className="invalid-feedback">{role?.message}</div>
          <div className="d-flex justify-content-evenly">
            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary mt-2"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {formState.isSubmitting ? "Updating ..." : "Edit"}
            </button>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-danger mt-2"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
