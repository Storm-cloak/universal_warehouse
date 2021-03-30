import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import Header from "../components/header/header";

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

const ProtectedRoute = ({
  authenticationPath,
  isAuthenticated,
  ...routeProps
}: ProtectedRouteProps) => {
  let redirectPath: string = "";
  if (!isAuthenticated) {
    redirectPath = authenticationPath;
  }
  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return (
      <Route {...routeProps} component={renderComponent} render={undefined} />
    );
  } else {
    return (
      <>
        <Header />
        <Route {...routeProps} />
      </>
    );
  }
};

export default ProtectedRoute;
