import React, { useContext } from "react";
import { UserContext, ContextType } from "../../context/UserContext";

export default function WarehouseIncomeMain() {
  const { user } = useContext(UserContext) as ContextType;

  return (
    <>
      {/* <Header /> */}
      {console.log(user)}
      <h1>MEDAXIL</h1>
    </>
  );
}
