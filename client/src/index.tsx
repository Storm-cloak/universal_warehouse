/// <reference types="@welldone-software/why-did-you-render" />
import whyDidYouRender from "@welldone-software/why-did-you-render";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./config/ThemeConfig";
import { UserProvider } from "./context/UserContext";
import { ToastProvider } from "./context/ToastContext";

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: "green",
  diffNameColor: "aqua",
  trackAllPureComponents: true,
});

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <UserProvider>
        <ToastProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ToastProvider>
      </UserProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
