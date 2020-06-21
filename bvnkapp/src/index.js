import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/storeconfig/store";
import * as serviceWorker from "./serviceWorker";
import { Layout } from "./utils/context/Layout";

const LazyApp = lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <Suspense
      fallback={
        <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
      }
    >
      <Layout>
        <React.StrictMode>
          <LazyApp />
        </React.StrictMode>
      </Layout>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
