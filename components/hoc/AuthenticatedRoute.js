import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { addUser, updateUserImage } from "redux/userSlice";
import { validateUser, getUserImage } from "services/auth";
import { toast } from "react-toastify";
import { API_URL } from "constants";

const access_token = "access-token";

const authenticatedRoute = (Component = null, options = {}) => {
  class AuthenticatedRoute extends React.Component {
    state = {
      loading: true,
    };

    async componentDidMount() {
      const { user, addUser, updateUserImage } = this.props;
      if (user) {
        this.setState({ loading: false });
      } else if (localStorage.getItem(access_token)) {
        try {
          const { data } = await validateUser();
          addUser(data.data);
          const res = await getUserImage();
          updateUserImage(API_URL + res.data);
          if (options.role && data.data.role !== options.role) {
            Router.push("/");
          }
          this.setState({ loading: false });
        } catch (ex) {
          toast.error(ex.response?.data?.errors[0]);
        }
      } else {
        Router.push(options.pathAfterFailure || "/auth/login");
      }
    }

    render() {
      const { loading } = this.state;

      if (loading) {
        return <div />;
      }

      return <Component {...this.props} />;
    }
  }

  return connect(
    (state) => ({
      user: state.user.user,
    }),
    { addUser, updateUserImage }
  )(AuthenticatedRoute);
};

export default authenticatedRoute;
