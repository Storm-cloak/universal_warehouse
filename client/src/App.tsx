import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAppApolloClient } from "./config/ApolloClient";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import ProtectedRoute, { ProtectedRouteProps } from "./config/protectedRoute";
import { useAuthToken } from "./config/auth";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/login";
import WarehouseIncomeMain from "./pages/WarehouseIncome/warehouse.income.main.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import Dashboard from "./pages/Dashboard/dashboard";

function App() {
  const apolloClient = useAppApolloClient();
  const [authToken] = useAuthToken();

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!authToken, //to boolean
    authenticationPath: "/login",
  };
  return (
    <ApolloProvider client={apolloClient}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => (authToken ? <Redirect to="/" /> : <Login />)}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path="/warehouseincome"
            component={WarehouseIncomeMain}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path="/"
            component={Dashboard}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
