'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { NODE_ENV } from '@/config';
import { handleError, handleSubmissionError } from '@/lib/utils';

export const useTronLink = () => {
  const [tronWeb, setTronWeb] = useState(null);
  const [address, setAddress] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isTronLinkLoading, setIsTronLinkLoading] = useState(false);

  const connectToTron = async () => {
    setIsTronLinkLoading(true);
    try {
      if (!window.tronWeb) {
        toast.error(
          'TronLink is not ready. Please check your TronLink extension.',
        );
        setIsTronLinkLoading(false);
        return null;
      }

      let user = await window.tronLink.request({
        method: 'tron_requestAccounts',
      });

      const maxAttempts = 50;
      let attempts = 0;

      while (!window.tronWeb.ready && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }

      if (attempts === maxAttempts) {
        throw new Error(
          'TronWeb is not ready. Please check your TronLink extension.',
        );
      }

      if (user.code === 200) {
        const tronWebInstance = window.tronWeb;
        const address = tronWebInstance.defaultAddress.base58;
        const nodeInfo = await tronWebInstance.trx.getNodeInfo();
        const network = nodeInfo.configNodeInfo.network_id;
        const host = window.tronWeb.fullNode.host;

        switch (NODE_ENV) {
          case 'development':
            if (host !== 'https://api.shasta.trongrid.io') {
              toast.error('Please switch to TRON Shasta Testnet network');
              setIsTronLinkLoading(false);
              return null;
            }
            break;
          case 'production':
            if (host !== 'https://api.trongrid.io') {
              toast.error('Please switch to TRON Mainnet (TronGrid) network');
              setIsTronLinkLoading(false);
              return null;
            }
            break;
          default:
            toast.error('Please switch to the correct network');
            setIsTronLinkLoading(false);
            return null;
        }

        setTronWeb(tronWebInstance);
        setAddress(address);
        setIsReady(tronWebInstance.ready);
        toast.success('Connected to TronLink');

        return {
          tronWeb: tronWebInstance,
          address,
          network,
        };
      } else {
        throw new Error('Error connecting to TronLink');
      }
    } catch (error) {
      handleSubmissionError(error, 'Error connecting to TronLink');
    } finally {
      setIsTronLinkLoading(false);
    }
  };

  const sendTRC20 = async ({
    amount,
    assetId,
    contractAddress,
    email,
    id,
    name,
    toAddress,
    tronWeb,
  }) => {
    if (!tronWeb) {
      toast.error('TronWeb instance is required');
      return;
    }

    console.log({
      tronWeb,
      contractAddress,
      toAddress,
      amount,
      id,
      name,
      email,
      assetId,
    });

    try {
      const transaction = await tronWeb.transactionBuilder.sendToken(
        toAddress, // recipient address
        amount, // amount of tokens to send
        contractAddress, // token ID
        tronWeb.defaultAddress.base58, // sender address
      );

      const signedTransaction = await tronWeb.trx.sign(transaction);
      console.log({ signedTransaction });
      const broadcast = await tronWeb.trx.sendRawTransaction(signedTransaction);
      console.log({ broadcast });

      return broadcast;

      // const contract = await tronWeb.contract().at(contractAddress);
      // console.log({ toAddress });
      // const hash = await contract.transfer(toAddress, amount).send();
      // console.log({ hash });
      // const res = await savePayment({
      //   id,
      //   hash,
      //   assetId,
      //   email,
      //   name,
      // });

      // if (res.error) {
      //   throw new Error(res.error);
      // }

      // return hash;
    } catch (error) {
      console.log({ error });
      handleError(error, 'Transfer failed');
    }
  };

  const handleTronLinkTransfer = async ({
    amount,
    assetId,
    contractAddress,
    email,
    id,
    name,
    toAddress,
    tronWeb,
  }) => {
    console.log({
      amount,
      assetId,
      contractAddress,
      email,
      id,
      name,
      toAddress,
      tronWeb,
    });
    return new Promise((resolve) => {
      toast.promise(
        sendTRC20({
          amount,
          assetId,
          contractAddress,
          email,
          id,
          name,
          toAddress,
          tronWeb,
        }),
        {
          loading: 'Waiting for the transaction...',
          success: (result) => {
            resolve(result);
            return `Token transfer success: ${result}`;
          },
          error: (error) => {
            console.log({ error });
            resolve(`Transfer failed: ${error}`);
            return `Transfer failed: ${error}`;
          },
        },
      );
    });
  };

  return {
    address,
    connectToTron,
    isReady,
    isTronLinkLoading,
    handleTronLinkTransfer,
    tronWeb,
  };
};
