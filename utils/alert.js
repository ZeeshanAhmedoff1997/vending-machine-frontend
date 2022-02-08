import Swal from "sweetalert2";

export const showConifrmAlert = (title, text) => {
  return Swal.fire({
    title: title ? title : "Are you sure?",
    text: text ? text : "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};

export const isSignedIn = (user) => {
  return user ? true : false;
};

export const isBuyer = (user) => {
  return user.role === "buyer" ? true : false;
};

export const isSeller = (user) => {
  return user.role === "seller" ? true : false;
};

export const logout = () => {
  delete Axios.defaults.headers.common[access_token];
  localStorage.removeItem(access_token);
};
