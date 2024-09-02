import { ShieldCheck } from 'lucide-react';

const SuccessMessage = () => (
  <div className="flex flex-col items-center justify-center space-y-2 py-8">
    <ShieldCheck size={64} />
    <h3 className="text-lg font-bold">Your order has been received!</h3>
    <p className="text-center text-sm">
      You will receive an email confirmation shortly.
    </p>
  </div>
);

export { SuccessMessage };
