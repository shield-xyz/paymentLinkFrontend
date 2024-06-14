import { Icons } from '@/components';
import Button from '@/components/ui/button';

const ErrorModalContent = ({ handleClose }) => {
  return (
    <div>
      <Icons.errorSent className="ml-40" />
      <div className="flex w-full flex-col items-center gap-7 px-6 pb-6">
        <p className="text-xl font-semibold">Withdrawal failed</p>
        <Button
          className="w-full font-semibold"
          onClick={handleClose}
          variant="outline"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ErrorModalContent;
