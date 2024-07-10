import { Loader } from '@/components';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[40] flex min-h-screen flex-col items-center justify-center">
      <Loader />
    </div>
  );
}
