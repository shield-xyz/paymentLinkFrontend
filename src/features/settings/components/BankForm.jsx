'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormInput } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { handleSubmissionError, handleSubmissionSuccess } from '@/lib/utils';

import { updateBankingData } from '../actions';

const bankDataSchema = z.object({
  'custom.beneficiary_name': z
    .string()
    .min(1, { message: 'Beneficiary name is required' }),
  'custom.bank_name': z.string().min(1, { message: 'Bank name is required' }),
  'custom.account_number': z
    .string()
    .min(1, { message: 'Account number is required' }),
  'custom.routing_number': z
    .string()
    .min(1, { message: 'Routing number is required' }),
  'custom.street_address': z
    .string()
    .min(1, { message: 'Street address is required' }),
  'custom.city': z.string().min(1, { message: 'City is required' }),
  'custom.state': z.string().min(1, { message: 'State is required' }),
  'custom.zip_code': z.string().min(1, { message: 'Zip code is required' }),
  'custom.country': z.string().min(1, { message: 'Country is required' }),
});

export const BankForm = ({ bankData }) => {
  // const [isVisible, _setIsVisible] = useState(true);
  // const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm({
    resolver: zodResolver(bankDataSchema),
    mode: 'onTouch',
    defaultValues: {
      'custom.beneficiary_name': bankData['custom.beneficiary_name'] || '',
      'custom.bank_name': bankData['custom.bank_name'] || '',
      'custom.account_number': bankData['custom.account_number'] || '',
      'custom.routing_number': bankData['custom.routing_number'] || '',
      'custom.street_address': bankData['custom.street_address'] || '',
      'custom.city': bankData['custom.city'] || '',
      'custom.state': bankData['custom.state'] || '',
      'custom.zip_code': bankData['custom.zip_code'] || '',
      'custom.country': bankData['custom.country'] || '',
    },
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = form;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await updateBankingData(data);
      console.log({ res });
      handleSubmissionSuccess('Banking data saved successfully');
    } catch (error) {
      handleSubmissionError(error, 'Could not save banking data');
    }
  };

  return (
    <div>
      <h2 className="mb-4 mt-2 flex items-center gap-4 text-xl font-bold">
        Banking Information
        {/* {isVisible ? (
          <Button onClick={toggleVisibility} variant="ghost" title="Hide">
            <Icons.eye className="h-5 w-5 cursor-pointer" />
          </Button>
        ) : (
          <Button onClick={toggleVisibility} variant="ghost" title="Show">
            <Icons.eyeOff className="h-5 w-5 cursor-pointer" />
          </Button>
        )} */}
      </h2>
      {true && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <FormInput
            label="Beneficiary Name"
            placeholder="Beneficiary Name"
            name="custom.beneficiary_name"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Bank Name"
            placeholder="Bank Name"
            name="custom.bank_name"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Account Number"
            placeholder="Account Number"
            name="custom.account_number"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Routing Number"
            placeholder="Routing Number"
            name="custom.routing_number"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Street Address"
            placeholder="Street Address"
            name="custom.street_address"
            register={register}
            errors={errors}
          />
          <FormInput
            label="City"
            placeholder="City"
            name="custom.city"
            register={register}
            errors={errors}
          />
          <FormInput
            label="State"
            placeholder="State"
            name="custom.state"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Zip Code"
            placeholder="Zip Code"
            name="custom.zip_code"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Country"
            placeholder="Country"
            name="custom.country"
            register={register}
            errors={errors}
          />

          <Button
            className="mt-auto"
            type="submit"
            variant="default"
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
