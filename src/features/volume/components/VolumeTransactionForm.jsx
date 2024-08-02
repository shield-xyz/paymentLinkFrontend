'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { deleteVolumeTransaction, postVolumeTransaction } from '../actions';

import { FormInput } from '@/components/Form';
import { DatePickerForm } from '@/components/Form/DatePickerform';
import { GoBack } from '@/components/GoBack';
import { Button } from '@/components/ui/button';
import {
  camelCaseToWords,
  handleSubmissionError,
  handleSubmissionSuccess,
} from '@/lib/utils';

const selectedFieldsSchema = z.object({
  receivedAmount: z.coerce.number({ message: 'Received Amount is required' }),
  client: z.string().min(1, { message: 'Client Name is required' }),
  shieldFee: z.coerce.number().nullable({ message: 'Shield Fee is required' }),
  currencyPair: z.string().nullable(),
  blockchain: z.string().nullable(),
  date: z.coerce.string().min(1, { message: 'Transaction Date is required' }),
});
export const VolumeTransactionForm = ({ volumeTransactionData }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
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
    getValues,
  } = form;

  console.log(getValues());

  const onSubmit = async (data) => {
    // perform Put & Post
    console.log({ data });
    try {
      const res = await postVolumeTransaction(data);
      if (res.error) {
        throw new Error(res.error);
      }
      handleSubmissionSuccess('Selected transaction data saved successfully');
    } catch (error) {
      handleSubmissionError(error, 'Could not save selected transaction data');
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      await deleteVolumeTransaction(volumeTransactionData._id);
      handleSubmissionSuccess('Transaction deleted successfully');
      router.push('/volume');
    } catch (error) {
      handleSubmissionError(
        error,
        'Could not delete selected transaction data',
      );
      setIsDeleting(false);
    }
  };

  console.log({ isDeleting });

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 mt-2 flex items-center gap-4 text-xl font-bold">
          {volumeTransactionData ? 'Edit Transaction' : 'Create Transaction'}
        </h2>
        <GoBack className="mb-2">Back</GoBack>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {Object.keys(selectedFieldsSchema.shape).map((key) => {
          const label = camelCaseToWords(key);

          const numberTypes = ['receivedAmount', 'shieldFee'];

          if (key === 'date') {
            return (
              <DatePickerForm
                className=" w-full"
                key={key}
                label={label}
                placeholder={label}
                name={key}
                control={form.control}
                errors={errors}
                modal={false}
              />
            );
          }

          return (
            <FormInput
              autoFocus={key === 'receivedAmount'}
              type={numberTypes.includes(key) ? 'number' : 'text'}
              labelClassName=""
              key={key}
              label={label}
              placeholder={label}
              name={key}
              register={register}
              errors={errors}
              step="0.00000001"
            />
          );
        })}
        <div></div>
        <div className="ml-auto flex w-full items-center justify-end gap-2">
          {volumeTransactionData && (
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              isLoading={isDeleting}
            >
              Delete
            </Button>
          )}
          <Button type="submit" variant="default" isLoading={isSubmitting}>
            {volumeTransactionData ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};
