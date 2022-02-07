import { store } from "store";
import { Provider } from "react-redux";
import "../styles/styles.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";

import App from "components/App";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <App>
        <Component {...pageProps} />
      </App>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
