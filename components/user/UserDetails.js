import React, { useState } from "react";
import CustomImage from "../common/Image";
import avatar from "public/img_avatar.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppDispatch } from "redux/hooks";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { updateuser, deleteUser, logout, getUserImage } from "services/auth";
import { updateUser, removeUser, updateUserImage } from "redux/userSlice";
import { showConifrmAlert } from "utils/alert";
import { toast } from "react-toastify";
import { API_URL } from "constants";

const UserDetails = ({}) => {
  const { user } = useSelector((state) => state.user);

  const appDispatch = useAppDispatch();
  const roles = ["seller", "buyer"];

  const validationSchema = Yup.object().shape({
    role: Yup.string().required("Role is required").oneOf(roles),
  });

  const defaultValues = {
    name: user?.name || "",
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

  const onSubmit = async (user) => {
    if (user.profile_pic[0]) {
      uploadImage(user.profile_pic[0]);
    } else {
      try {
        const {
          data: { data },
        } = await updateuser(user);
        appDispatch(updateUser(data));
        toast.success("Successfully Updated");
        router.push("/");
      } catch (err) {
        toast.error(err.response?.data?.errors[0]);
      } finally {
        setIsEdit(false);
      }
    }
  };

  const uploadImage = async (profile_pic) => {
    try {
      const formData = new FormData();
      formData.append("profile_pic", profile_pic);
      await updateuser(formData);
      const { data } = await getUserImage();
      appDispatch(updateUserImage(API_URL + data));
      toast.success("Successfully Uploaded the Profile Picture");
    } catch (err) {
      toast.error(err.response?.data?.errors[0]);
    } finally {
      setIsEdit(false);
    }
  };

  const onEditClick = () => {
    setIsEdit(true);
  };

  const onDeleteClick = async () => {
    await showConifrmAlert(
      "Are you Sure to delete",
      "Your Account will be permanently deleted. Also all your products will be deleted"
    ).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser();
          appDispatch(removeUser());
          await logout();
          toast.success("Successfully deleted");
          router.push("/");
        } catch (err) {
          console.log("error", err.response);
          toast.error("Unable to delete");
        }
      }
    });
  };

  const { name, role, email } = errors;

  const roleOptions = roles.map((role, key) => (
    <option value={role} key={key}>
      {role}
    </option>
  ));

  return (
    <div className="user-details mt-2 border-info">
      <div className="alert alert-info m-2" role="alert">
        You cannot change your password
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
          <div className="w-30 mt-2">
            <input
              className="form-control form-control-sm"
              id="formFileSm"
              type="file"
              name="profile_pic"
              {...register("profile_pic")}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              disabled={formState.isSubmitting || isEdit}
              className="btn mt-2 btn-outline-info"
            >
              {formState.isSubmitting && !isEdit && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {formState.isSubmitting && !isEdit ? "Uploading" : "Uplaod"}
            </button>
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
            <button
              disabled={formState.isSubmitting || isEdit}
              className="btn btn-danger mt-2"
              type="button"
              onClick={onDeleteClick}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
