import { Icons } from '@/components';

export default async function Page() {
  return (
    <div className="flex h-full min-h-dvh w-screen flex-col items-center justify-center">
      <div className="m-auto flex flex-col items-center gap-1">
        <div className="mb-8 flex flex-col items-center justify-center gap-4">
          <Icons.logo />
          <h1 className="text-center text-4xl font-bold">
            Verification Success
          </h1>
        </div>
      </div>
    </div>
  );
}
