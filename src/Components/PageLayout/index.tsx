import React, { useContext } from "react";
import { Transactions } from "../Transactions";
import { TopWrapper, ConnectButton, TransactionForm } from "./styled";
import { TransactionContext } from "../../Context/TransactionContext";

export const PageLayout = () => {
  const {
    connectWallet,
    currentAccount,
    formData,
    handleChange,
    sendTransaction,
  } = useContext(TransactionContext);

  const handleSubmit = (e: any) => {
    console.log("hello from submit button");
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    console.log(addressTo, amount, keyword, message);

    if (!addressTo || !amount || !keyword || !message) return;

    console.log("hello world");
    sendTransaction();
    console.log("send transaction");
    return;
  };

  return (
    <TopWrapper>
      {!currentAccount && (
        <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
      )}

      <TransactionForm>
        <input
          id="addressTo"
          name="addressTo"
          type="text"
          placeholder="Address to"
          onChange={(e) => {
            handleChange(e, "addressTo");
          }}
        ></input>
        <input
          id="amount"
          name="amount"
          type="text"
          placeholder="Amount (ETH)"
          onChange={(e) => {
            handleChange(e, "amount");
          }}
        ></input>
        <input
          id="keyword"
          name="keyword"
          type="text"
          placeholder="Keyword (GIF)"
          onChange={(e) => {
            handleChange(e, "keyword");
          }}
        ></input>
        <input
          id="message"
          name="message"
          type="text"
          placeholder="Enter Message"
          onChange={(e) => {
            handleChange(e, "message");
          }}
        ></input>

        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Send Now.
        </button>
      </TransactionForm>
      <Transactions />
    </TopWrapper>
  );
};
