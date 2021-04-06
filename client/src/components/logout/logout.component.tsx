import React from "react";
import { useLogout } from "../../config/auth";
const Logout = () => {
  const logout = useLogout();
  return <button onClick={logout}>LOGOUT</button>;
};

export default Logout;
