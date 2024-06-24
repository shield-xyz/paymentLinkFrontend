import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const CustomModal = ({
  open,
  onClose,
  title,
  description,
  children,
  showCloseButton = true,
  className,
  withBackdrop = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      {withBackdrop && <DialogOverlay className="backdrop-blur-sm" />}
      <DialogContent
        className={cn('m:max-w-md', className)}
        showCloseButton={showCloseButton}
      >
        {(title || description) && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};

export { CustomModal };
