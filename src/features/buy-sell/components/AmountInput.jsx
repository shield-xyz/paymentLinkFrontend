const AmountInput = ({ amount, setAmount }) => {
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
    <input
      className="my-8 w-full text-center text-6xl font-extrabold focus:outline-none"
      type="text"
      placeholder="$0"
      value={amount}
      inputMode="numeric"
      onChange={handleAmountChange}
    />
  );
};

export { AmountInput };
