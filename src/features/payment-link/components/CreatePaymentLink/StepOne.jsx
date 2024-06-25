'use client';

import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { Icons } from '@/components';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export const StepOne = ({ form, networks }) => {
  const [networkSelected, setNetworkSelected] = useState(null);
  const [assetSelected, setAssetSelected] = useState(null);

  const {
    register,
    formState: { errors, isSubmitting },
    watch,
  } = form;

  console.log({ networks });

  const { getValues, setValue } = form;
  const values = getValues();

  const { token } = values;

  watch('token');

  const handleSelectToken = (asset) => {
    setValue('token', asset?.symbol, {
      shouldValidate: true,
    });
    setValue('assetId', asset?.assetId, {
      shouldValidate: true,
    });
  };

  const handleSelectNetwork = (network) => {
    if (network.name !== 'Tron') {
      toast.error('Only Tron is supported for now');
      return;
    }
    setNetworkSelected(network);
  };

  const handleSelectAsset = (asset) => {
    if (asset.symbol !== 'USDT') {
      toast.error('Only USDT is supported for now');
      return;
    }
    setAssetSelected(asset);
    handleSelectToken(asset);
  };

  const handleClearNetwork = () => {
    setNetworkSelected(null);
    setAssetSelected(null);
    handleSelectToken(null);
  };

  return (
    <Container className="m-auto flex w-96 max-w-[95vw] flex-col gap-2 rounded-lg border border-border p-4 sm:w-[450px]">
      <h1 className="mb-4 font-bold">Create payment link</h1>
      <Input
        placeholder="Product name"
        label="Product name"
        autoFocus
        {...register('name')}
      />
      <ErrorMessage
        errors={errors}
        name="name"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />
      <Textarea
        label="Description (optional)"
        placeholder="Tell us about the product"
        {...register('description')}
      />
      <ErrorMessage
        errors={errors}
        name="description"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />

      <Container className="rounded-md p-2 lg:rounded-md">
        <div className="flex h-9 w-full items-center gap-2 border-b pb-1">
          {networkSelected && (
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              size="iconSm"
              onClick={handleClearNetwork}
              title="Go back"
            >
              <Icons.chevronLeft className="h-4 w-4 cursor-pointer text-muted-foreground" />
            </Button>
          )}
          <span className="flex text-sm text-muted-foreground">
            Settlement networks & currencies
          </span>
        </div>
        <div className="flex w-full flex-col gap-2 py-2">
          {!networkSelected ? (
            networks.map((network) => (
              <Network
                key={network.id}
                network={network}
                handleSelectNetwork={handleSelectNetwork}
                networkSelected={networkSelected}
              />
            ))
          ) : (
            <>
              {networkSelected.assets.map((asset) => (
                <Asset
                  key={asset.assetId}
                  asset={asset}
                  handleSelectAsset={handleSelectAsset}
                  token={token}
                />
              ))}
            </>
          )}
        </div>
        <span className="text-xxs leading-[0.1rem]">
          You can update your accepted networks and currencies in{' '}
          <Link
            href="/profile"
            className="text-primary underline"
            tabIndex="-1"
          >
            account settings
          </Link>
        </span>
      </Container>
      <ErrorMessage
        errors={errors}
        name="token"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />

      <div className="relative">
        <Input
          placeholder="0.00"
          type="number"
          label="Price"
          step="0.01"
          disabled={!token}
          title={!token ? 'Please select a network and currency' : ''}
          {...register('amount')}
        />
        <span className="absolute bottom-[11px] right-10 text-xs font-semibold">
          {assetSelected?.symbol}
        </span>
      </div>
      <ErrorMessage
        errors={errors}
        name="amount"
        render={({ message }) => (
          <span className="text-sm text-destructive">{message}</span>
        )}
      />

      <Button
        type="submit"
        variant="default"
        className="mt-2 font-semibold"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        size="lg"
      >
        Continue
      </Button>
    </Container>
  );
};

const Network = ({ network, handleSelectNetwork, networkSelected }) => {
  return (
    <div
      key={network.id}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 duration-100 hover:bg-gray-100 active:bg-gray-200',
        {
          'bg-gray-100': networkSelected?._id === network._id,
        },
      )}
      onClick={() => handleSelectNetwork(network)}
    >
      <Image src={network.logo} alt={network.name} width={14} height={14} />
      <span className="text-sm">{network.name}</span>
    </div>
  );
};

const Asset = ({ asset, handleSelectAsset, token }) => {
  return (
    <div
      key={asset.assetId}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 duration-100 hover:bg-gray-100 active:bg-gray-200',
        {
          'bg-gray-100': token === asset.symbol,
        },
      )}
      onClick={() => handleSelectAsset(asset)}
    >
      <Image src={asset.logo} alt={asset.name} width={14} height={14} />
      <span className="text-sm">{asset.name}</span>
    </div>
  );
};
