import React, { useContext } from "react";
import { Transactions } from "../Transactions";
import { TopWrapper, ConnectButton } from "./styled";
import { TransactionContext } from "../../Context/TransactionContext";

export const PageLayout = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  return (
    <TopWrapper>
      {!currentAccount && (
        <ConnectButton onClick={connectWallet}>Connect Wallet</ConnectButton>
      )}

      <form>
        <input
          id="toAddress"
          name="toAddress"
          type="text"
          placeholder="Address to"
        ></input>
        <input
          id="toAddress"
          name="toAddress"
          type="text"
          placeholder="Address to"
        ></input>
        <input
          id="toAddress"
          name="toAddress"
          type="text"
          placeholder="Address to"
        ></input>
        <input
          id="toAddress"
          name="toAddress"
          type="text"
          placeholder="Address to"
        ></input>
      </form>
      <Transactions />
    </TopWrapper>
  );
};
