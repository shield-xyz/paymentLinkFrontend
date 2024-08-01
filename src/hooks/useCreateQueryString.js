'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useCreateQueryString = () => {
  const [searchParams] = useSearchParams();

  return useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
};
