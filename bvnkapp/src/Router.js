import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import Loader from "react-loader-spinner";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { ContextLayout } from "./utils/context/Layout";
//Code split with lazy
const Login = lazy(() => import("./views/auth/Login"));

const RouteConfig = ({ component: Component, fullLayout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(value) => {
            let LayoutTag =
              fullLayout === true
                ? value.fullLayout
                : value.state.activeLayout === "horizontal"
                ? value.horizontalLayout
                : value.verticalLayout;
            return (
              //permission added
              <LayoutTag {...props}>
                <Suspense
                  fallback={
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height={100}
                      width={100}
                      timeout={3000} //3 secs
                    />
                  }
                >
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <AppRoute path="/" component={Login} fullLayout />
      </Switch>
    </Router>
  );
};

export default AppRouter;
