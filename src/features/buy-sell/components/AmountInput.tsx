import { useEffect, useState } from 'react';

const AmountInput = ({ amount, setAmount, quotes }) => {
  const [exchangeRate, setExchangeRate] = useState();
  const [exchangeSymbol, setExchangeSymbol] = useState();

  useEffect(() => {
    if (!quotes) return;
    setExchangeRate(quotes[0].exchangeRate);
    setExchangeSymbol(quotes[0].assetOut);
  }, [quotes]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setAmount('');
      return;
    }

    const validAmountRegex = /^\$?\d*\.?\d*$/;
    if (!validAmountRegex.test(value)) return;

    if (value.startsWith('$')) {
      setAmount(value === '$' ? '' : value);
    } else {
      if (Number(value) > 0) {
        setAmount(`$${value}`);
      }
    }
  };

  return (
    <div className="my-8 flex flex-col items-center justify-center space-y-2">
      <input
        className="w-full text-center text-6xl font-extrabold focus:outline-none"
        type="text"
        placeholder="$0"
        value={amount}
        inputMode="numeric"
        onChange={handleAmountChange}
      />
      <span className="text-xs text-gray-500">
        1 {exchangeSymbol} = {exchangeRate} USD
      </span>
    </div>
  );
};

export { AmountInput };
