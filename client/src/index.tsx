import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./config/ThemeConfig";
import { UserProvider } from "./context/UserContext";
ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </UserProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
