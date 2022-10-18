import React, { useContext } from "react";
import { TransactionContext } from "../../Context/TransactionContext";

export const Transactions = () => {
  const { transactionList } = useContext(TransactionContext);
  console.log(transactionList);
  return (
    <div>
      {transactionList.map((transaction: any) => (
        <div>
          <div>{transaction.addressTo}</div>
          <div>{transaction.addressFrom}</div>
          <div>{transaction.amount}</div>
          <div>{transaction.message}</div>
          <div>{transaction.timestamp}</div>
          <div>{transaction.keyword}</div>
        </div>
      ))}
    </div>
  );
};
