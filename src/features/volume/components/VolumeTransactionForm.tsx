'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormInput } from '@/components/Form';
import { DatePickerForm } from '@/components/Form/DatePickerform';
import { GoBack } from '@/components/GoBack';
import { Button } from '@/components/ui/button';
import {
  camelCaseToWords,
  handleSubmissionError,
  handleSubmissionSuccess,
} from '@/lib/utils';

import {
  deleteVolumeTransaction,
  postVolumeTransaction,
  putVolumeTransaction,
} from '../actions';

const amountValidation = (keyText) =>
  z.preprocess(
    (input) => {
      if (input === '') {
        return NaN;
      }
      return parseFloat(input);
    },
    z
      .number({ message: `${keyText} is required` })
      .min(0, { message: `${keyText} must be greater than 0` }),
  );

const selectedFieldsSchema = z.object({
  receivedAmount: amountValidation('Received Amount'),
  client: z.string().min(1, { message: 'Client Name is required' }),
  shieldFee: amountValidation('Shield Fee'),
  currencyPair: z.string().nullable(),
  blockchain: z.string().nullable(),
  tx: z.string().nullable(),
  date: z.coerce.string().min(1, { message: 'Transaction Date is required' }),
});

export const VolumeTransactionForm = ({ volumeTransactionData }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const isEdit = !!volumeTransactionData;

  const form = useForm({
    resolver: zodResolver(selectedFieldsSchema),
    mode: 'onTouch',
    defaultValues: {
      receivedAmount: volumeTransactionData?.receivedAmount || '',
      client: volumeTransactionData?.client || '',
      shieldFee: volumeTransactionData?.shieldFee || '',
      currencyPair: volumeTransactionData?.currencyPair || '',
      blockchain: volumeTransactionData?.blockchain || '',
      tx: volumeTransactionData?.tx || '',
      date: volumeTransactionData?.date || '',
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = form;

  const onSubmit = async (data) => {
    try {
      const payload = {
        _id: volumeTransactionData?._id,
        receivedAmount: String(data.receivedAmount),
        client: data.client,
        shieldFee: String(data.shieldFee),
        currencyPair: data.currencyPair,
        blockchain: data.blockchain,
        tx: data.tx,
        date: data.date,
      };

      let res;
      if (isEdit) {
        res = await putVolumeTransaction({
          ...payload,
          _id: volumeTransactionData._id,
        });
      } else {
        res = await postVolumeTransaction(payload);
      }

      if (res.error) {
        throw new Error(res.error);
      }
      router.push('/volume', { scroll: false });
      handleSubmissionSuccess(
        `Transaction ${isEdit ? 'updated' : 'created'} successfully`,
      );
      router.refresh();
    } catch (error) {
      handleSubmissionError(
        error,
        `Could not ${isEdit ? 'update' : 'create'} transaction`,
      );
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      await deleteVolumeTransaction(volumeTransactionData._id);
      handleSubmissionSuccess('Transaction deleted successfully');
      router.push('/volume', { scroll: false });
      router.refresh();
    } catch (error) {
      handleSubmissionError(
        error,
        'Could not delete selected transaction data',
      );
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="mb-10 mt-2 flex items-center gap-4 text-xl font-bold">
          {volumeTransactionData ? 'Edit Transaction' : 'Create Transaction'}
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.keys(selectedFieldsSchema.shape).map((key) => {
            const label = camelCaseToWords(key);

            const numberTypes = ['receivedAmount', 'shieldFee'];

            if (key === 'date') {
              return (
                <DatePickerForm
                  className="w-full"
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
                step={key === 'shieldFee' ? '0.01' : '0.00000001'}
                min="0"
                isPercentage={key === 'shieldFee'}
              />
            );
          })}
        </div>

        <div className="mt-10 flex w-full items-center justify-between">
          <GoBack className="flex">Back</GoBack>
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
        </div>
      </form>
    </div>
  );
};
