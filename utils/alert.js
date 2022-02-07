import Swal from "sweetalert2";

export const showAlert = () => {
  Swal.fire("Good job!", "You clicked the button!", "success");
};

export const isAlreadyLogin = (user) => {
  return user ? true : false;
};

export const isBuyer = (user) => {
  return user.role === "buyer" ? true : false;
};

export const isSeller = (user) => {
  return user.role === "seller" ? true : false;
};
