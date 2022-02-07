import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { addUser } from "redux/userSlice";
import { validateUser } from "services/auth";

const authenticatedRoute = (Component = null, options = {}) => {
  class AuthenticatedRoute extends React.Component {
    state = {
      loading: true,
    };

    async componentDidMount() {
      const { user } = this.props;
      if (user) {
        this.setState({ loading: false });
      } else {
        const { data } = await validateUser();
        if (data.data) {
          addUser(data.data);
          this.setState({ loading: false });
        } else {
          Router.push(options.pathAfterFailure || "/auth/login");
        }
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
    () => ({
      addUser,
    })
  )(AuthenticatedRoute);
};

export default authenticatedRoute;
