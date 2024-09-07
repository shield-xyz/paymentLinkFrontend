'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormInput } from '@/components/Form';
import { Button } from '@/components/ui/button';
import { handleSubmissionError, handleSubmissionSuccess } from '@/lib/utils';

import { updateBankingData } from '../actions';

const bankDataSchema = z.object({
  beneficiary_name: z
    .string()
    .min(1, { message: 'Beneficiary name is required' }),
  bank_name: z.string().min(1, { message: 'Bank name is required' }),
  account_number: z.string().min(1, { message: 'Account number is required' }),
  routing_number: z.string().min(1, { message: 'Routing number is required' }),
  street_address: z.string().min(1, { message: 'Street address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip_code: z.string().min(1, { message: 'Zip code is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

export const BankForm = ({ bankData }) => {
  const router = useRouter();
  // const [isVisible, _setIsVisible] = useState(true);
  // const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm({
    resolver: zodResolver(bankDataSchema),
    mode: 'onTouched',
    defaultValues: {
      beneficiary_name: bankData['custom.beneficiary_name'] || '',
      bank_name: bankData['custom.bank_name'] || '',
      account_number: bankData['custom.account_number'] || '',
      routing_number: bankData['custom.routing_number'] || '',
      street_address: bankData['custom.street_address'] || '',
      city: bankData['custom.city'] || '',
      state: bankData['custom.state'] || '',
      zip_code: bankData['custom.zip_code'] || '',
      country: bankData['custom.country'] || '',
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
      const obj = {};
      Object.keys(data).forEach((key) => {
        obj[`custom.${key}`] = data[key];
      });

      const res = await updateBankingData(obj);
      if (res.status !== 'success') {
        throw new Error('Could not save banking data');
      }
      handleSubmissionSuccess('Banking data saved successfully');
      router.refresh();
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
            name="beneficiary_name"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Bank Name"
            placeholder="Bank Name"
            name="bank_name"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Account Number"
            placeholder="Account Number"
            name="account_number"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Routing Number"
            placeholder="Routing Number"
            name="routing_number"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Street Address"
            placeholder="Street Address"
            name="street_address"
            register={register}
            errors={errors}
          />
          <FormInput
            label="City"
            placeholder="City"
            name="city"
            register={register}
            errors={errors}
          />
          <FormInput
            label="State"
            placeholder="State"
            name="state"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Zip Code"
            placeholder="Zip Code"
            name="zip_code"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Country"
            placeholder="Country"
            name="country"
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
