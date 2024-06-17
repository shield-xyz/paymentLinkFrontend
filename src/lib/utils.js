import clsx from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

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

export function handleSubmissionError(error, defaultMessage) {
  let message = defaultMessage;
  if (error instanceof Error) {
    message = error.message;
  }
  console.error(error);
  toast.error(message);
}

export function handleSubmissionSuccess(successMessage) {
  toast.success(successMessage);
}

async function parseResponse(response) {
  try {
    return await response.json();
  } catch (error) {
    console.error('Error parsing response JSON:', error);
    return null;
  }
}

export async function validateResponse(response, defaultMessage) {
  if (!response.ok) {
    const data = await parseResponse(response);
    const message = data?.data?.response || defaultMessage;
    console.error(`${message}: ${response.status} - ${response.statusText}`);
    throw new Error(message);
  } else {
    const res = await parseResponse(response);
    if (res && res.status === 'error') {
      throw new Error(res.response || defaultMessage);
    }
    return res;
  }
}

export const fetchWithToken = async (url, token, options = {}) => {
  console.log('Fetching with token:', token); // Log the token
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'x-auth-token': token,
    },
  });
  console.log('Fetch response:', response); // Log the fetch response
  return response;
};

export const formatNetwork = (network) => {
  return network ? network.toLocaleLowerCase().replace('-mainnet', '') : '';
};

export const TYPES = { Deposit: 'Deposit', Withdrawal: 'Withdrawal' };
export const STATUSES = { Completed: 'Completed', Pending: 'Pending' };
export const PAYMENT_STATUSES = {
  Pending: 'Pending',
  Expired: 'Expired',
  Paid: 'Paid',
};
export const PAYMENT_DESCRIPTIONS = {
  Monthly_Subscription: 'Monthly Subscription',
  Annual_Membership: 'Annual Membership',
  One_time_payment: 'One-time Payment',
  Service_fee: 'Service Fee',
  Donation: 'Donation',
  Other: 'Other',
};
