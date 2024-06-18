'use client';

import BigNumber from 'bignumber.js';
import Swal from 'sweetalert2';

const addStrongTags = (text) => {
  if (!text.startsWith('<strong>') || !text.endsWith('</strong>')) {
    text = `<strong>${text}</strong>`;
  }
  return text;
};

export const showAlert = (title, text = '', icon = 'info') => {
  text = text + '';
  Swal.fire({
    title: title || 'Default Title',
    html: addStrongTags(text) || 'Default Text',
    icon: icon || 'info',
    confirmButtonText: 'Ok',
  });
};

export const connectToTronLink = async () => {
  try {
    if (!window.tronWeb) {
      showAlert('Error', 'TronLink is not installed', 'error');
      return null;
    }

    let user = await window.tronLink.request({
      method: 'tron_requestAccounts',
    });

    while (!window.tronWeb.ready) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (user.code == 200) {
      const tronWebInstance = window.tronWeb;
      const address = tronWebInstance.defaultAddress.base58;
      const nodeInfo = await tronWebInstance.trx.getNodeInfo();
      const network = nodeInfo.configNodeInfo.network_id;
      console.log(network, nodeInfo, 'network nodeinfo');
      return {
        tronWeb: tronWebInstance,
        address,
        network,
      };
    } else {
      return { tronWeb: null, address: null };
    }
  } catch (error) {
    console.log(error);
    showAlert('Error', error.message ? error.message : error, 'error');
    return { tronWeb: null, address: null };
  }
};

export const sendTRX = async (tronWeb, toAddress, amount) => {
  if (!tronWeb) {
    showAlert('Error', 'TronWeb instance is required', 'error');
    return;
  }

  const sunAmount = tronWeb.toSun(amount);

  try {
    const transaction = await tronWeb.trx.sendTransaction(toAddress, sunAmount);
    console.log('Transaction successful:', transaction);
    return transaction;
  } catch (error) {
    showAlert('Error sending token', error.message, 'error');
  }
};

export const sendTRC20 = async (
  tronWeb,
  contractAddress,
  toAddress,
  amount,
  // id, not used
) => {
  if (!tronWeb) {
    showAlert('Error', 'TronWeb instance is required', 'error');
    return;
  }

  try {
    showAlert('Info', 'Waiting for the transaction.');
    const contract = await tronWeb.contract().at(contractAddress);
    const transaction = await contract.transfer(toAddress, amount).send();
    console.log('TRC20 Token transfer successful:', transaction);
    showAlert(
      'Token transfer successful',
      'Please save the next code: ' + transaction,
      'success',
    );
    return transaction;
  } catch (error) {
    console.log(error);
    showAlert(
      'Error sending TRC20 token',
      'Remember to use the mainnet network',
      'error',
    );
  }
};

export const sendTokenWithMemo = async (
  tronWeb,
  recipient,
  amount,
  tokenID,
  memo,
) => {
  try {
    if (!tronWeb || !tronWeb.ready) {
      showAlert(
        'TronWeb is not initialized',
        'Please connect to TronLink',
        'error',
      );
      return;
    }

    const transaction = await tronWeb.transactionBuilder.sendToken(
      recipient,
      amount,
      tokenID,
    );

    transaction.raw_data.data = tronWeb.toHex(memo);

    const signedTransaction = await tronWeb.trx.signMessageV2(transaction);

    const isValid = await tronWeb.trx.verifyMessageV2(signedTransaction);

    if (!isValid) {
      showAlert(
        'Invalid signature',
        'The transaction will not be sent',
        'error',
      );
      throw new Error('Invalid signature. The transaction will not be sent.');
    }

    const receipt = await tronWeb.trx.sendRawTransaction(signedTransaction);

    console.log('Transaction receipt:', receipt);
    return receipt;
  } catch (error) {
    showAlert(
      'Error sending transaction',
      error.message ? error.message : error,
      'error',
    );
  }
};

export const parseAmountToDecimals = (amount, decimals) => {
  const factor = new BigNumber(10).pow(decimals);
  const parsedAmount = new BigNumber(amount).times(factor);
  return parsedAmount.toFixed(0);
};
