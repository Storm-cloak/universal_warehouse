import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAppApolloClient } from "./config/ApolloClient";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import ProtectedRoute, { ProtectedRouteProps } from "./config/protectedRoute";
import { useAuthToken } from "./config/auth";
import subMain from "./pages/subMain/subMain";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/login";
import Main from "./pages/Main/main";

function App() {
  const apolloClient = useAppApolloClient();
  const [authToken] = useAuthToken();

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!authToken, //to boolean
    authenticationPath: "/login",
  };
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path="/submain"
            component={subMain}
          />
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            exact
            path="/"
            component={Main}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
