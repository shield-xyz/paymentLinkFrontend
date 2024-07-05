'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { savePayment } from '../actions';

import { handleError, handleSubmissionError } from '@/lib/utils';

// evento para cuando cambia de red

export const useTronLink = () => {
  const [tronWeb, setTronWeb] = useState(null);
  const [address, setAddress] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isTronLinkLoading, setIsTronLinkLoading] = useState(false);

  const connectToTron = async () => {
    setIsTronLinkLoading(true);
    try {
      if (!window.tronWeb) {
        toast.error('TronLink is ready. Please check your TronLink extension.');
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
        // esto da un id distinto segun que red este conectada.
        // cuando estamos en dev apunte a Sashta, y cuando este en prod apunte a mainet.
        // Lo mismo con MetaMask (Sepolia testing) y Ethereum mainet
        // Si no esta en la red adecuado, pedirle que cambie al cliente por favor.
        const tronWebInstance = window.tronWeb;
        console.log({ tronWebInstance });
        console.log(window.tronWeb.fullNode);
        const address = tronWebInstance.defaultAddress.base58;
        const nodeInfo = await tronWebInstance.trx.getNodeInfo();
        console.log({ nodeInfo });
        console.log('nodeInfo: ', nodeInfo.configNodeInfo);
        const network = nodeInfo.configNodeInfo.network_id;
        // const host = window.tronWeb.fullNode.host;

        // si host !==  https://api.trongrid.io entonces...
        // network debe elegir
        // crear un .env para sashta y otro para mainet

        // https://api.trongrid.io para mainet

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
      const contract = await tronWeb.contract().at(contractAddress);
      const hash = await contract.transfer(toAddress, amount).send();

      const res = await savePayment({
        id,
        hash,
        assetId,
        email,
        name,
      });

      console.log({ res });

      if (res.error) {
        throw new Error(res.error);
      }

      return hash;
    } catch (error) {
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
