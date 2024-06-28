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
