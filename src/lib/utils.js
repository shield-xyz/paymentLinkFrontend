import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

import { env } from '@/config';

import { knownErrorsMessages } from './knownErrors';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
  const [day] = formattedDate.split('/');
  return `${day}`;
}

export function formatDateShort(date) {
  const options = {
    month: '2-digit',
    day: '2-digit',
  };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
}

export function formatDateTime(date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
}

export function formatCurrency(amount, digits = 2) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: digits,
  });
}

export function formatCrypto(amount, digits = 2) {
  return amount.toLocaleString('en-US', {
    style: 'decimal',
    maximumFractionDigits: digits,
  });
}

export function formatExpiry(expiry) {
  if (!expiry) return '';
  return `Exp ${expiry.slice(0, 2) + '/' + expiry.slice(2)}`;
}

export function formatTransactionCardExpiry(expiry) {
  if (!expiry) return '';
  return `${expiry.slice(0, 2) + '/20' + expiry.slice(2)}`;
}

export function formatCardNumber(cardNumber) {
  return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
}

export const findPrice = (nativeSymbol, prices) => {
  const { price } = prices.find((price) => price.name === nativeSymbol) || {
    price: 0,
  };
  return price;
};

export function handleError(error, defaultMessage) {
  let message = defaultMessage;
  if (error instanceof Error) {
    message = error.message;
  }
  console.error(error);
  throw new Error(message);
}

export function handleReturnError(error, defaultMessage) {
  let message = defaultMessage;
  if (error instanceof Error) {
    message = error.message;
  }
  console.error({ error, defaultMessage, message });
  return { error: message };
}

export function handleSubmissionError(error, defaultMessage) {
  let message = defaultMessage;
  if (error instanceof Error) {
    message = knownErrorsMessages[error.message] || error.message;
  }
  console.error(error);
  toast.error(message);
}

export function handleSubmissionSuccess(successMessage) {
  toast.success(successMessage);
}

function getStringValue(value) {
  return typeof value === 'string' ? value : null;
}

async function parseResponse(response) {
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error parsing response:', error);
    return null;
  }
}

export async function validateResponse(response, defaultMessage) {
  // console.log({ response });
  if (!response.ok) {
    const data = await parseResponse(response);
    console.error('error data:', data);
    let message =
      getStringValue(data?.data?.response) ||
      getStringValue(data.response) ||
      getStringValue(data.message) ||
      getStringValue(data.msg) ||
      defaultMessage;
    throw new Error(message);
  } else {
    const res = await parseResponse(response);
    if (res && res.status === 'error') {
      console.error('error data:', res);
      throw new Error(res.response || defaultMessage);
    }
    return res;
  }
}

export const fetchWithToken = async (url, token, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'x-auth-token': token,
    },
  });
  return response;
};

export const parseAmountToDecimals = (amount, decimals) => {
  const factor = new BigNumber(10).pow(decimals);
  const parsedAmount = new BigNumber(amount).times(factor);
  return parsedAmount.toFixed(0);
};

export const TYPES = { Deposit: 'Deposit', Withdrawal: 'Withdrawal' };
export const ACTIVITY_TYPES = {
  Transaction: 'Transaction',
  Withdrawal: 'Withdrawal',
};
export const STATUSES = { Completed: 'completed', Pending: 'pending' };
export const PAYMENT_STATUSES = {
  Pending: 'pending',
  Expired: 'expired',
  Paid: 'paid',
  Paused: 'Paused',
};
export const PAYMENT_DESCRIPTIONS = {
  Monthly_Subscription: 'Monthly Subscription',
  Annual_Membership: 'Annual Membership',
  One_time_payment: 'One-time Payment',
  Service_fee: 'Service Fee',
  Donation: 'Donation',
  Other: 'Other',
};

export const getLogoUrl = (url) => {
  return `${env.NEXT_PUBLIC_API_URL}/${url}`;
};

export const downloadImage = async (imageUrl, imageName = undefined) => {
  try {
    const finalImageName = imageName || imageUrl.split('/').pop();
    const response = await fetch(imageUrl);

    if (!response.ok) throw new Error('Network response was not ok.');

    const imageBlob = await response.blob();
    const mimeType = imageBlob.type || 'application/octet-stream';
    const imageFile = new File([imageBlob], finalImageName, { type: mimeType });

    return imageFile;
  } catch (error) {
    handleError(error, 'Error downloading or setting image');
  }
};

export function formatAmount(amount, decimals) {
  // Ensure amount is a BigNumber to handle large or precise numbers
  const bigAmount = new BigNumber(amount);
  if (bigAmount.isNaN()) {
    // Handle invalid input
    console.error('Invalid amount input');
    return 'NaN';
  }

  // Format the number with specified decimal places
  let formattedAmount = bigAmount.toFixed(decimals);

  // Remove trailing zeros and decimal point if not needed
  formattedAmount = formattedAmount.replace(/\.?0+$/, '');

  return formattedAmount;
}

export function formatCryptoHash(hash) {
  if (!hash) return '';
  return `${hash.slice(0, 4)}...${hash.slice(-6)}`;
}

export const NOTIFICATION_STATUS = {
  SEEN: 'seen',
  NOT_SEEN: 'not seen',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
};

export const camelCaseToWords = (str) => {
  return str
    .split(/(?=[A-Z])/) // Split at position before uppercase letters
    .join(' ') // Join array elements into a string, separated by spaces
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first character of the resulting string
};

export const formatPercentage = (value) => {
  return `${value}%`;
};
