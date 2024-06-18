import { cn } from '@/lib/utils';

const Alert = ({ type = 'info', children }) => {
  const alertClasses = cn(
    'px-4 py-3 rounded relative',
    {
      'bg-blue-100 border-blue-500 text-blue-700': type === 'info',
      'bg-red-100 border-red-500 text-red-700': type === 'danger',
      'bg-yellow-100 border-yellow-500 text-yellow-700': type === 'warning',
      'bg-green-100 border-green-500 text-green-700': type === 'success',
    },
    'border-l-4',
  );

  return (
    <div className={alertClasses} role="alert">
      {children}
    </div>
  );
};

export { Alert };
