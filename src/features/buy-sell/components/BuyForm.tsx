import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import { AmountInput } from './AmountInput';
import { AssetSelect } from './AssetSelect';
import { QuotesList } from './QuotesList';
import { SuccessMessage } from './SuccessMessage';
import { WalletInput } from './WalletInput';
import { WireDetails } from './WireDetails';
import { confirmWireOrder, fetchQuotes } from '../actions';

const BuyForm = ({ session }) => {
  const [fiat, setFiat] = useState('usd');
  const [amount, setAmount] = useState('$100');
  const [asset, setAsset] = useState(null);
  const [quotes, setQuotes] = useState(null);
  const [wallet, setWallet] = useState('');
  const [quoteTimeout, setQuotesTimeout] = useState(30);
  const [isFetchingQuote, setIsFetchingQuotes] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showWireDetails, setShowWireDetails] = useState(false);
  const [wireOrder, setWireOrder] = useState(null);

  const walletInputRef = useRef(null);

  const handleFetchQuotes = useCallback(() => {
    fetchQuotes({ amount, asset, fiat, setQuotes, setIsFetchingQuotes });
  }, [amount, asset, fiat]);

  useEffect(() => {
    handleFetchQuotes();
    setQuotesTimeout(30);

    const countdownInterval = setInterval(() => {
      setQuotesTimeout((prev) => {
        if (prev === 1) {
          handleFetchQuotes();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    setIntervalId(countdownInterval);

    return () => clearInterval(countdownInterval);
  }, [handleFetchQuotes]);

  useEffect(() => setWallet(''), [asset]);

  const handleConfirmWireOrder = async () => {
    const { status } = await confirmWireOrder(session.accessToken, wireOrder);

    if (status === 'unverified') {
      toast.warning('Must verify your account to continue');
    } else if (status !== 'success') {
      toast.error('Error confirming wire order');
    } else {
      setSuccess(true);
    }
  };

  if (success) return <SuccessMessage />;

  if (showWireDetails)
    return <WireDetails onConfirm={handleConfirmWireOrder} />;

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

      <AmountInput amount={amount} setAmount={setAmount} quotes={quotes} />
      <AssetSelect value={asset} onValueChange={setAsset} />
      <WalletInput wallet={wallet} setWallet={setWallet} ref={walletInputRef} />

      {isFetchingQuote || !quotes ? (
        <>
          <Skeleton className="my-6 h-[40px] w-[280px] self-center rounded-full" />
          <Skeleton className="h-[174px] w-[418px] rounded-lg" />
        </>
      ) : (
        <QuotesList
          quotes={quotes}
          quoteTimeout={quoteTimeout}
          walletInputRef={walletInputRef}
          wallet={wallet}
          intervalId={intervalId}
          setIntervalId={setIntervalId}
          setShowWireDetails={setShowWireDetails}
          setWireOrder={setWireOrder}
          setSuccess={setSuccess}
          session={session}
          asset={asset}
        />
      )}
    </div>
  );
};

export { BuyForm };
