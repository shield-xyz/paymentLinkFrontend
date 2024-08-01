import { ErrorMessage } from '@hookform/error-message';

import { Input } from '../ui/input';

export const FormInput = ({
  label,
  placeholder,
  name,
  register,
  errors,
  ...props
}) => (
  <div className="flex flex-col">
    <Input
      label={label}
      placeholder={placeholder}
      {...register(name)}
      {...props}
    />
    <ErrorMessage
      errors={errors}
      name={name}
      as="span"
      className="mt-1 text-sm text-destructive"
    />
  </div>
);
