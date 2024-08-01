'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormInput } from '@/components/Form';
import { GoBack } from '@/components/GoBack';
import { Button } from '@/components/ui/button';
import {
  camelCaseToWords,
  handleSubmissionError,
  handleSubmissionSuccess,
} from '@/lib/utils';

const selectedFieldsSchema = z.object({
  receivedAmount: z.number({ message: 'Received Amount is required' }),
  client: z.string().min(1, { message: 'Client Name is required' }),
  date: z.string().min(1, { message: 'Transaction Date is required' }),
  shieldFee: z.number({ message: 'Shield Fee is required' }),
  currencyPair: z.string().min(1, { message: 'Currency Pair is required' }),
  blockchain: z.string().min(1, { message: 'Blockchain is required' }),
});

export const VolumeTransactionForm = ({ volumeTransactionData }) => {
  console.log({ volumeTransactionData });

  const form = useForm({
    resolver: zodResolver(selectedFieldsSchema),
    mode: 'onTouch',
    defaultValues: volumeTransactionData,
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = form;

  const onSubmit = async (data) => {
    // perform Put & Post
    console.log(data);
    try {
      handleSubmissionSuccess('Selected transaction data saved successfully');
    } catch (error) {
      handleSubmissionError(error, 'Could not save selected transaction data');
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    // perform Delete
    try {
      handleSubmissionSuccess('Selected transaction data deleted successfully');
    } catch (error) {
      handleSubmissionError(
        error,
        'Could not delete selected transaction data',
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mb-4 mt-2 flex items-center gap-4 text-xl font-bold">
          Transaction Form
        </h2>
        <GoBack className="mb-2">Back</GoBack>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {Object.keys(selectedFieldsSchema.shape).map((key) => {
          const label = camelCaseToWords(key);

          return (
            <FormInput
              labelClassName=""
              key={key}
              label={label}
              placeholder={label}
              name={key}
              register={register}
              errors={errors}
            />
          );
        })}
        <div></div>
        <div className="ml-auto flex w-full items-center justify-end gap-2">
          {volumeTransactionData && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          )}
          <Button type="submit" variant="default" isLoading={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
