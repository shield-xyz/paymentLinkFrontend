'use client';

import { useState } from 'react';

export const usePaymentLink = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const steps = [
    {
      title: 'Details',
      description: 'Fill in the details below to create a payment link.',
    },
    {
      title: 'Completed',
      description: 'The payment link has been created successfully.',
    },
  ];

  return {
    step,
    steps,
    nextStep,
    prevStep,
  };
};
