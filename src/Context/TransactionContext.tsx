import React, { useState, useEffect, Children, ReactNode } from "react";
import { Contract, ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constans";
import { TransactionFormType } from "./types";

export const TransactionContext = React.createContext<any>(0);

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  console.log("hello from ethereum contract");
  const transactionContract = new Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }: any) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [formData, setFormData] = useState<TransactionFormType>({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const [transactionList, setTransactionList] = useState<any[]>([]);

  const handleChange = (e: Event, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: (e.target as HTMLInputElement).value,
    }));

    console.log(formData);
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }

      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      getAllTransactions();

      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }

      console.log(accounts);
    } catch (err) {
      console.log(err);
      throw new Error("No ethereum object");
    }
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }

      const transactionContract = await getEthereumContract();

      const currentTransactions =
        await transactionContract.getAllTransactions();

      const structuredTransactions = currentTransactions.map(
        (transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      setTransactionList(structuredTransactions);
    } catch (err) {
      console.error(err);
      throw new Error("Something went wrong while getting transactions");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Please install metamask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);

      window.location.reload();
    } catch (err) {
      console.error(err);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      }
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log("Loading - ", transactionHash);
      await transactionHash.wait();
      setIsLoading(false);
      console.log("success: ", transactionHash);

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      window.location.reload();
    } catch (err) {
      console.error(err);
      throw new Error("Error sending transaction");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        handleChange,
        sendTransaction,
        transactionList,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
