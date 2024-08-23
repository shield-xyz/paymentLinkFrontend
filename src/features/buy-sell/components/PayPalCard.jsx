import { FUNDING, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalCard = ({
  disabled,
  quote,
  createOrder,
  onCancel,
  onApprove,
  onError,
}) => {
  return (
    <div className="rounded-lg border-2 border-blue-300 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div>Paypal</div>
        </div>
        <div className="text-end">
          <div className="flex items-center gap-2 font-bold">
            <span>≈</span>
            <div>
              {quote.amountOut} {quote.assetOut}
            </div>
          </div>
          <div className="text-gray-500">
            {quote.amountIn} {quote.assetIn}
          </div>
        </div>
      </div>
      <PayPalButtons
        disabled={disabled}
        fundingSource={FUNDING.PAYPAL}
        className="mt-4"
        createOrder={createOrder}
        onCancel={onCancel}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
};

export { PayPalCard };
