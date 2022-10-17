import React, { useContext } from "react";
import { TransactionContext } from "../../Context/TransactionContext";

export const Transactions = () => {
  const { value } = useContext(TransactionContext);
  console.log(value);

  return <div>hello world</div>;
};
