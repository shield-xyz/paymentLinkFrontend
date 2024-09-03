import copy from 'copy-to-clipboard';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import QRCode from 'qrcode.react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import Spinner from '@/components/ui/spinner';
import { env } from '@/config';
import { getNetworks } from '@/features/payment-link';
import { formatCryptoHash } from '@/lib/utils';

import { AssetSelect } from './AssetSelect';
import { SuccessMessage } from './SuccessMessage';
import { confirmOffRampOrder, createOffRampOrder } from '../actions';

const SellForm = ({ enabled }) => {
  const { data: session } = useSession();

  const [networks, setNetworks] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState();
  const [fiat, setFiat] = useState('usd');
  const [amount, setAmount] = useState(100);
  const [asset, setAsset] = useState();
  const [quote, setQuote] = useState(null);
  const [quoteTimeout, setQuoteTimeout] = useState(30);
  const [isFetchingQuote, setIsFetchingQuote] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [shouldTransfer, setShouldTransfer] = useState(false);
  const [hash, setHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [order, setOrder] = useState();

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // If the value is empty, clear the amount
    if (!value) {
      setAmount('');
      return;
    }

    // Validate the input with a regular expression
    const validAmountRegex = /^\d*\.?\d*$/;
    if (!validAmountRegex.test(value)) {
      return;
    }

    setAmount(value);
  };

  useEffect(() => {
    getNetworks().then(setNetworks);
  }, []);

  useEffect(() => {
    if (networks.length && asset) {
      setSelectedNetwork(networks.find((n) => n.networkId === asset.networkId));
    }
  }, [asset, networks]);

  const fetchQuote = useCallback(() => {
    if (!amount || !asset) {
      setQuote(null);
      return;
    }

    setIsFetchingQuote(true);

    const assetIn = asset.symbol;

    if (!amount) {
      return;
    }

    const params = new URLSearchParams({
      assetIn,
      assetOut: fiat,
      amountIn: amount,
    });

    fetch(`${env.NEXT_PUBLIC_API_URL}/api/quotes/offramp?${params.toString()}`)
      .then((res) => res.json())
      .then(setQuote)
      .catch((error) => {
        if (error.name === 'AbortError') {
          return;
        }
        console.error('Error fetching quote:', error);
      })
      .finally(() => setIsFetchingQuote(false));
  }, [amount, asset, fiat]);

  useEffect(() => {
    fetchQuote();
    setQuoteTimeout(30);

    const countdownInterval = setInterval(() => {
      setQuoteTimeout((prev) => {
        if (prev === 1) {
          fetchQuote();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(countdownInterval);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [fetchQuote]);

  const handleContinue = async () => {
    setIsLoading(true);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    const { id } = await createOffRampOrder(
      session.accessToken,
      quote.encoded,
      selectedNetwork.networkId,
    );

    setOrder(id);

    setIsLoading(false);
    setShouldTransfer(true);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const { status } = await confirmOffRampOrder(
      session.accessToken,
      order,
      hash,
    );

    setIsLoading(false);

    if (status === 'unverified') {
      toast.error('Unverified user');
      return;
    }

    if (status !== 'success') {
      toast.error('Error confirming payment');
      return;
    }

    setSuccess(true);
  };

  if (!enabled) {
    return (
      <div className="flex flex-col items-center space-y-4 p-8">
        <h3 className="text-center text-base font-normal">
          Please add your banking details before proceeding to sell crypto
          assets
        </h3>
        <Link href="/settings/bank-account">
          <Button>Add Banking Details</Button>
        </Link>
      </div>
    );
  }

  if (success) {
    return <SuccessMessage />;
  }

  if (shouldTransfer) {
    return (
      <div className="p-8">
        <div className="text-black/30">Scan/Send Deposit</div>
        <div className="flex items-center justify-center p-4 sm:p-8">
          <QRCode
            className="hidden sm:block"
            value={selectedNetwork.deposit_address}
            size={200}
          />
          <QRCode
            className="block sm:hidden"
            value={selectedNetwork.deposit_address}
            size={180}
          />
        </div>
        <div className="mt-4 flex justify-between gap-4 sm:gap-8">
          <div className="text-black/60">Address</div>
          <div className="flex gap-2 sm:gap-4">
            <div className="hidden sm:block">
              {selectedNetwork.deposit_address.slice(0, 8) +
                '......' +
                selectedNetwork.deposit_address.slice(-8)}
            </div>
            <div className="block sm:hidden">
              {formatCryptoHash(selectedNetwork.deposit_address)}
            </div>

            <button
              onClick={() => {
                copy(selectedNetwork.deposit_address);
                toast.success('Address copied');
              }}
            >
              <Icons.copy />
            </button>
          </div>
        </div>
        <div className="mb-4 mt-4 flex justify-between">
          <div className="text-black/60">Total amount</div>
          <div className="flex gap-2">
            <div>
              {amount} {asset.symbol}
            </div>
          </div>
        </div>
        <div className="mb-2 text-black/60">Transaction hash</div>
        <Input
          value={hash}
          className="mb-2"
          onChange={(e) => setHash(e.target.value)}
        />
        <p className="mt-2 text-sm text-black/60">
          Please paste the transaction hash in the designated field above and
          click the button to initiate the validation process.
        </p>
        <Button
          onClick={handleSubmit}
          className="mt-8 w-full font-medium"
          disabled={!hash}
        >
          {isLoading ? <Spinner /> : 'I have paid!'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8">
      <Select onValueChange={setFiat} value={fiat}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-48">
          <SelectItem value="usd">USD</SelectItem>
        </SelectContent>
      </Select>
      <input
        className="my-8 w-full text-center text-6xl font-extrabold focus:outline-none"
        type="text"
        placeholder="0"
        value={amount}
        inputMode="numeric"
        onChange={handleAmountChange}
      />
      <AssetSelect value={asset} onValueChange={setAsset} />
      {isFetchingQuote || !quote ? (
        <>
          <Skeleton className="my-6 h-[40px] w-[280px] self-center rounded-full" />
          <Skeleton className="h-[174px] w-[418px] rounded-lg" />
        </>
      ) : quote.error ? (
        <div className="px-4 pt-8">
          <h3 className="text-center text-lg font-normal">{quote.error}</h3>
        </div>
      ) : (
        <>
          <div className="my-6 w-auto self-center rounded-full bg-slate-100 px-4 py-1">
            New quote in <span className="font-semibold">{quoteTimeout}</span>{' '}
            seconds
          </div>
          <div className="rounded-lg border-2 border-blue-300 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500">
                {quote.amountIn} {quote.assetIn}
              </div>
              <div className="text-end">
                <div className="flex items-center gap-2 font-bold">
                  <span>≈</span>
                  <div>
                    {quote.amountOut} {quote.assetOut}
                  </div>
                </div>
              </div>
            </div>
            <Button
              className="mt-4 w-full rounded-full"
              onClick={async () => await handleContinue()}
            >
              {isLoading ? <Spinner /> : 'Continue with the Transfer'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export { SellForm };
