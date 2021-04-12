import React, { createContext, useState, useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//======================================================================================\\
//                                INTERFACES AND SCHEMAS                                \\
//======================================================================================\\
export type Props = {
  children: React.ReactNode;
};
export type IMsg = {
  msg: string;
  hint?: string;
};

export type ToastContextType = {
  showError: ({ msg, hint }: IMsg) => React.ReactText;
  showSuccess: ({ msg, hint }: IMsg) => React.ReactText;
};

//======================================================================================\\
//                                CONTEXT AND PROVIDER                                  \\
//======================================================================================\\

const Msg = ({ msg, hint }: IMsg) => {
  return (
    <>
      <span>{msg}</span>
      <br></br>
      <span>{hint}</span>
    </>
  );
};

export const ToastContext = createContext<ToastContextType | {}>({});

export const ToastProvider = ({ children }: Props) => {
  const showError = ({ msg, hint }: IMsg) => {
    console.log(msg, hint);
    toast.error(<Msg msg={msg} hint={hint} />);
  };

  const showSuccess = ({ msg }: IMsg) => toast.success(<Msg msg={msg} />);
  return (
    <>
      <ToastContext.Provider value={{ showError, showSuccess }}>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          transition={Flip}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ToastContext.Provider>
    </>
  );
};
