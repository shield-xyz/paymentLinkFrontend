import { ErrorMessage } from '@hookform/error-message';
import { Controller } from 'react-hook-form';

import { DatePicker } from '../DatePicker';

export const DatePickerForm = ({
  label,
  placeholder,
  name,
  control,
  errors,
  key,
  className,
  ...props
}: {
  label: string;
  placeholder: string;
  name: string;
  control: any;
  errors: any;
  key: string;
  className?: string;
  modal?: boolean;
}) => {
  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field }) => (
          <DatePicker
            id={name}
            value={field.value}
            onChange={field.onChange}
            placeholder={placeholder}
            label={label}
            {...props}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        as="span"
        className="mt-1 text-sm text-destructive"
      />
    </div>
  );
};
