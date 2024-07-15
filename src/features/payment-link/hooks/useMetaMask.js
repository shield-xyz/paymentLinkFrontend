'use client';

import detectEthereumProvider from '@metamask/detect-provider';
import { useState } from 'react';
import { toast } from 'sonner';
import { Web3 } from 'web3';

import { savePayment } from '../actions';

import { NODE_ENV } from '@/config';
import { handleError } from '@/lib/utils';

export const useMetaMask = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [isMetaMaskLoading, setIsMetaMaskLoading] = useState(false);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  const connectToMetaMask = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      try {
        setIsMetaMaskLoading(true);
        // Request account access if needed
        await provider.request({ method: 'eth_requestAccounts' });
        // Get the connected accounts
        const networkId = await web3Instance.eth.net.getId();

        switch (NODE_ENV) {
          case 'development':
            if (networkId !== 11155111n) {
              toast.error('Please switch to Sepolia Testnet network');
              setIsMetaMaskLoading(false);
              return null;
            }
            break;
          case 'production':
            if (networkId !== 1n) {
              toast.error('Please switch to Ethereum Mainnet network');
              setIsMetaMaskLoading(false);
              return null;
            }
            break;
          default:
            toast.error('Please switch to the correct network');
            setIsMetaMaskLoading(false);
            return null;
        }

        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setIsMetaMaskConnected(true);
        }
        setAccount(accounts[0]);

        // Listen for network and account changes
        provider.on('chainChanged', handleChainChanged);
        provider.on('accountsChanged', (accounts) => {
          handleAccountsChanged(accounts);
          if (accounts.length > 0) {
            setIsMetaMaskConnected(true);
          } else {
            setIsMetaMaskConnected(false);
          }
        });
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
        setIsMetaMaskConnected(false);
      } finally {
        setIsMetaMaskLoading(false);
      }
    } else {
      console.error('MetaMask not detected');
      setIsMetaMaskConnected(false);
    }
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.error('Please connect to MetaMask.');
      setIsMetaMaskConnected(false);
    } else {
      setAccount(accounts[0]);
      setIsMetaMaskConnected(true);
    }
  };

  const metaTaskTransfer = async ({
    account,
    amount,
    toAddress,
    tokenAddress,
    id,
    assetId,
    name,
    email,
  }) => {
    console.log({
      account,
      amount,
      toAddress,
      tokenAddress,
    });
    if (web3 && account) {
      const tokenContract = new web3.eth.Contract(
        [
          {
            constant: false,
            inputs: [
              {
                name: '_to',
                type: 'address',
              },
              {
                name: '_value',
                type: 'uint256',
              },
            ],
            name: 'transfer',
            outputs: [
              {
                name: '',
                type: 'bool',
              },
            ],
            type: 'function',
          },
        ],
        tokenAddress,
      );

      try {
        const result = await tokenContract.methods
          .transfer(toAddress, amount)
          .send({ from: account });

        const res = await savePayment({
          id,
          hash: result.transactionHash,
          assetId,
          email,
          name,
        });

        if (res.error) {
          throw new Error(res.error);
        }

        console.log('Transfer successful:', result);
        return result.transactionHash;
      } catch (error) {
        handleError(error, 'Transfer failed');
      }
    }
  };

  const handleMetaMaskTransfer = ({
    account,
    amount,
    toAddress,
    tokenAddress,
    id,
    assetId,
    name,
    email,
  }) => {
    return new Promise((resolve) => {
      toast.promise(
        metaTaskTransfer({
          account,
          amount,
          toAddress,
          tokenAddress,
          id,
          assetId,
          name,
          email,
        }),
        {
          loading: 'Waiting for the transaction...',
          success: (result) => {
            resolve(result);
            return `Transfer successful: ${result}`;
          },
          error: (error) => {
            resolve(`Transfer failed: ${error}`);
            return `Transfer failed: ${error}`;
          },
        },
      );
    });
  };

  return {
    connectToMetaMask,
    account,
    handleMetaMaskTransfer,
    isMetaMaskLoading,
    isMetaMaskConnected,
  };
};
