'use name';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icons } from '@/components';
import { FormInput } from '@/components/Form';
import { GoBack } from '@/components/GoBack';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  camelCaseToWords,
  cn,
  handleSubmissionError,
  handleSubmissionSuccess,
} from '@/lib/utils';

import {
  deleteClientAddress,
  postClientAddress,
  updateClientAddress,
} from '../actions';

const selectedFieldsSchema = z.object({
  name: z.string().min(1, { message: 'Client Name is required' }),
  groupIdWpp: z.string().optional(),
  wallets: z
    .array(
      z
        .string()
        .min(26, {
          message: 'Please insert a valid address between 26 and 62 characters',
        })
        .max(62, {
          message: 'Please insert a valid address between 26 and 62 characters',
        })
        .regex(/^[a-zA-Z0-9]+$/, {
          message: 'Please insert a valid address',
        }),
    )
    .optional(),
});

export const ClientAddressForm = ({
  clientAddress,
  onClose,
  disabled,
  wpGroups,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const isEdit = !!clientAddress;

  const form = useForm({
    resolver: zodResolver(selectedFieldsSchema),
    mode: 'onTouched',
    defaultValues: {
      name: clientAddress?.name || '',
      groupIdWpp: clientAddress?.groupIdWpp || '',
      wallets: clientAddress?.wallets || [],
    },
    disabled,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    watch,
    trigger,
    setValue,
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'wallets',
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        _id: clientAddress?._id,
        name: data.name,
        groupIdWpp: data.groupIdWpp,
        wallets: data.wallets,
      };

      let res;
      if (isEdit) {
        res = await updateClientAddress({
          ...payload,
          _id: clientAddress._id,
        });
      } else {
        res = await postClientAddress(payload);
      }

      if ('error' in res) {
        throw new Error(res.error);
      }
      handleSubmissionSuccess(
        `Client Address ${isEdit ? 'updated' : 'created'} successfully`,
      );
      router.refresh();
      onClose();
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
      await deleteClientAddress(clientAddress._id);
      handleSubmissionSuccess('Client Address deleted successfully');
      router.refresh();
      onClose();
    } catch (error) {
      handleSubmissionError(
        error,
        'Could not delete selected transaction data',
      );
      setIsDeleting(false);
    }
  };

  watch('wallets');

  const handleGroupIdWpp = (groupIdWpp) => {
    setValue('groupIdWpp', groupIdWpp);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex max-h-[50vh] max-w-6xl grid-cols-1 flex-col gap-4 overflow-auto p-2 sm:grid sm:grid-cols-2 sm:px-4">
          {Object.keys(selectedFieldsSchema.shape).map((key) => {
            const label = camelCaseToWords(key);

            if (key === 'wallets') {
              return (
                <div key={key} className="col-span-2">
                  <div className="flex w-full flex-col gap-2">
                    <h3>Wallets</h3>
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex w-full items-start justify-between gap-2 sm:gap-4"
                      >
                        <FormInput
                          className="w-full text-xs sm:text-sm"
                          defaultValue={`wallets.${index}`}
                          errors={errors}
                          key={`wallets.${index}`}
                          label=""
                          name={`wallets.${index}`}
                          placeholder="Wallet"
                          register={register}
                          type="text"
                          onChange={(e) => {
                            setValue(`wallets.${index}`, e.target.value, {
                              shouldValidate: !!errors.wallets,
                            });
                          }}
                        />
                        <Button
                          className="hidden px-2 text-xs sm:flex sm:px-4 sm:text-sm"
                          variant="ghost"
                          type="button"
                          onClick={() => remove(index)}
                          disabled={disabled}
                        >
                          Remove
                        </Button>
                        <Button
                          className="flex px-2 text-xs sm:hidden sm:px-4 sm:text-sm"
                          variant="ghost"
                          type="button"
                          onClick={() => remove(index)}
                          disabled={disabled}
                        >
                          <Icons.close className="text-xs" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={async () => {
                        const valid = await trigger('wallets');
                        if (!valid) return;
                        append('');
                      }}
                      disabled={disabled}
                    >
                      Add Wallet
                    </Button>
                  </div>
                </div>
              );
            }

            if (key === 'groupIdWpp') {
              return (
                <div key={key}>
                  <label className={cn('block text-sm')} htmlFor={'groupIdWpp'}>
                    WhatsApp Group
                  </label>
                  <Select
                    onValueChange={handleGroupIdWpp}
                    value={watch('groupIdWpp')}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select WhatsApp Group" />
                    </SelectTrigger>
                    <SelectContent className="max-h-48">
                      {wpGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              );
            }

            return (
              <FormInput
                autoFocus={key === 'receivedAmount'}
                type={'text'}
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
        </div>

        <div className="mt-10 flex w-full items-center justify-between">
          <GoBack className="flex" onClick={onClose}>
            Back
          </GoBack>
          {!disabled && (
            <div className="ml-auto flex w-full items-center justify-end gap-2">
              {clientAddress && (
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
                {clientAddress ? 'Update' : 'Create'}
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
