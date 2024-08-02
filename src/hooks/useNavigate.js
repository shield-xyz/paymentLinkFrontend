import { useRouter } from 'next/navigation';

export const useNavigate = () => {
  const router = useRouter();

  async function navigate(newCurrency) {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, currency: newCurrency.value },
      },
      undefined,
      { scroll: false },
    );
  }

  return navigate;
};
