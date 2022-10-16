import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { TopWrapper, ConnectButton } from "./styled";

export const PageLayout = () => {
  const [provider, setProvider] = useState<any>(window.ethereum);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(
    window.ethereum.selectedAddress
  );
  const [isConnected, setIsConnected] = useState(
    window.ethereum.selectedAddress ? true : false
  );
  const [web3Provider, setweb3Provider] = useState<any>(null);

  useEffect(() => {
    if (provider && provider !== window.ethereum) {
      console.error(
        "not window.ethereum provider, you might have multiple wallets installed"
      );
    }
    console.log("hello world");
    setweb3Provider(new ethers.providers.Web3Provider(window.ethereum));
  }, [provider]);

  useEffect(() => {
    async function handleAccountsChanged() {
      const accounts: any[] = await web3Provider.listAccounts();
      console.log(accounts);
      console.log(currentAccount);
      if (!accounts || accounts.length === 0) {
        onLogout();
      }
      setCurrentAccount(accounts[0]);
    }

    if (isConnected) {
      provider.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (isConnected) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [isConnected]);

  const onLogin = async () => {
    setIsConnecting(true);
    await provider.request({
      method: "eth_requestAccounts",
    });
    setIsConnecting(false);
    const accounts: any[] = await web3Provider.listAccounts();
    
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask!");
    } else if (accounts[0] !== currentAccount) {
      //setProvider(web3Provider);
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    }
  };

  function onLogout() {
    setIsConnected(false);
    setCurrentAccount(null);
  }

  return (
    <TopWrapper>
      {!isConnected && (
        <ConnectButton
          onClick={() => {
            !isConnected && onLogin();
          }}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </ConnectButton>
      )}
      <h2>Wallet Address: {currentAccount}</h2>
    </TopWrapper>
  );
};
